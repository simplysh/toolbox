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

const show = element => {
  const expression = element.getAttribute('data-show');
  element.removeAttribute('data-show');

  return state => {
    const effect = new Function(...Object.keys(state), `return ${expression};`);
    const result = effect(...Object.values(state));

    const style = element.style.display;
    const computed = getComputedStyle(element).display;

    if (result) {
      if (computed === 'none') {
        element.style.display = style === 'none' ? '' : 'block';
      }
    } else {
      if (computed !== 'none') {
        element.style.display = 'none';
      }
    }
  }
}

const attr = (element, attribute) => {
  const expression = element.getAttribute(`data-${attribute}`);
  element.removeAttribute(`data-${attribute}`);

  return state => {
    const effect = new Function(...Object.keys(state), `return ${expression};`);
    element.setAttribute(attribute, effect(...Object.values(state)));
  }
}

export const reactive = (state) => {
  const subscribers = new Map();
  const watchers = {};

  const bind = (directive, ...options) => element => {
    const subscriber = directive(element, ...options);

    subscribers.set(element, [...subscribers.get(element) ?? [], subscriber]);
    subscriber(state);
  }

  const hydrate = (root = document.body) => {
    document.querySelectorAll('[data-text]').forEach(bind(text));
    document.querySelectorAll('[data-model]').forEach(bind(model));
    document.querySelectorAll('[data-class]').forEach(bind(className));
    document.querySelectorAll('[data-show]').forEach(bind(show));

    document.querySelectorAll('[data-aria-checked]').forEach(bind(attr, 'aria-checked'));
  }

  const watch = (property, handler) => {
    watchers[property] = [...watchers[property] ?? [], handler];
  }

  const proxy = {
    set(target, prop, value, receiver) {
      if (watchers[prop]) {
        for (const handler of watchers[prop]) {
          handler.call(receiver, value, target[prop]);
        }
      }

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

  return { state: new Proxy(state, proxy), hydrate, watch };
};

export const VERSION = '0.5.2';
