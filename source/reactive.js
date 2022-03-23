const text = element => state => {
  const expression = element.getAttribute('data-text');
  const effect = new Function(...Object.keys(state), `return ${expression};`);
  element.innerHTML = effect(...Object.values(state));
};

const model = element => {
  const prop = element.getAttribute('data-model');
  element.addEventListener('input', event => state[prop] = event.target.value);
  return state => element.value = state[prop];
}

export const reactive = (state) => {
  const subscribers = new Map();

  const bind = directive => element => {
    const subscriber = directive(element);
    subscribers.set(element, [...subscribers.get(element) ?? [], subscriber]);
    subscriber(state);
  }

  const hydrate = () => {
    document.querySelectorAll('[data-text]').forEach(bind(text));
    document.querySelectorAll('[data-model]').forEach(bind(model));
  }

  // todo: bind all
  var observer = new MutationObserver(function([mutations]) {
    Array.from(mutations.addedNodes)
      .filter(({ nodeType }) => nodeType === 1)
      .forEach(bind(text));
  });

  observer.observe(document, {
    subtree: true,
    childList: true,
  });

  const proxy = {
    set(target, prop, value, receiver) {
      target[prop] = value;

      for (const subscriber of subscribers.values()) {
        for (const directive of subscriber) {
          directive(target);
        }
      }

      return true;
    },
    get(target, prop, receiver) {
      return Reflect.get(...arguments);
    }
  }

  hydrate(state);
  return new Proxy(state, proxy);
}

export const VERSION = '0.3.0';
