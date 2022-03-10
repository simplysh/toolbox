const text = element => state => {
  const expression = element.getAttribute('data-text');
  const effect = new Function(...Object.keys(state), `return ${expression};`);
  element.innerHTML = effect(...Object.values(state));
};

export const reactive = (state) => {
  const subscribers = new Map();

  const bind = (element) => {
    const subscriber = text(element);
    subscribers.set(element, subscriber);
    subscriber(state);
  }

  const hydrate = () => {
    document.querySelectorAll('[data-text]').forEach(bind);
  }

  var observer = new MutationObserver(function([mutations]) {
    Array.from(mutations.addedNodes)
      .filter(({ nodeType }) => nodeType === 1)
      .forEach(bind);
  });

  observer.observe(document, {
    subtree: true,
    childList: true,
  });

  const proxy = {
    set(target, prop, value, receiver) {
      target[prop] = value;

      for (const subscriber of subscribers.values()) {
        subscriber(target);
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

export const VERSION = '0.2.0';
