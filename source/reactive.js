const text = element => {
  const expression = element.getAttribute('data-text');
  element.removeAttribute('data-text');

  return state => {
    const effect = new Function(...Object.keys(state), `return ${expression};`);
    element.innerHTML = effect(...Object.values(state));
  }
}

const model = element => {
  const prop = element.getAttribute('data-model');
  element.removeAttribute('data-model');
  element.addEventListener('input', event => state[prop] = event.target.value);

  return state => element.value = state[prop];
}

const className = element => {
  const expression = element.getAttribute('data-class');
  element.removeAttribute('data-class');

  return state => {
    const effect = new Function(...Object.keys(state), `return ${expression};`);

    for (const [key, value] of Object.entries(effect(...Object.values(state)))) {
      element.classList.toggle(key, value);
    }
  }
}

export const reactive = (state) => {
  const subscribers = new Map();

  const bind = directive => element => {
    const subscriber = directive(element);

    subscribers.set(element, [...subscribers.get(element) ?? [], subscriber]);
    subscriber(state);
  }

  const hydrate = (root = document.body) => {
    document.querySelectorAll('[data-text]').forEach(bind(text));
    document.querySelectorAll('[data-model]').forEach(bind(model));
    document.querySelectorAll('[data-class]').forEach(bind(className));
  }

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

  return [new Proxy(state, proxy), hydrate];
};

export const VERSION = '0.4.0';
