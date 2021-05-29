export const text = document.createTextNode.bind(document);

export const clear = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }

  return node;
}

export const remove = nodeList => {
  Array.from(nodeList).forEach(node => {
    node.parentNode.removeChild(node);
  });
}

export const fragment = nodeList => Array.from(nodeList).reduce(
  (frag, child) => {
    frag.appendChild(child);
    return frag;
  },
  document.createDocumentFragment()
);

export const el = (nodeName, ...args) => {
  const unitless = ['zIndex', 'opacity'];
  const svg = ['svg', 'circle', 'polygon', 'rect', 'line', 'clipPath', 'use', 'mask', 'defs', 'path'];

  let element;
  let attributes = {};
  let children = [];

  if (svg.includes(nodeName)) {
    element = document.createElementNS('http://www.w3.org/2000/svg', nodeName);

    if (nodeName === 'svg') {
      attributes = { ...attributes, xmlns: 'http://www.w3.org/2000/svg' };
    }
  } else {
    element = document.createElement(nodeName);
  }

  switch (args.length) {
    case 2:
      attributes = { ...attributes, ...args[0] };
      children = [].concat(args[1])
      break;
    case 1:
      const [singleArgument] = args;

      if (
        typeof singleArgument === 'string'
        || typeof singleArgument === 'number'
        || singleArgument instanceof Node
        || Array.isArray(singleArgument)
      ) {
        children = [].concat(singleArgument);
        break;
      }

      if (typeof singleArgument === 'object') {
        attributes = { ...attributes, ...singleArgument };
        break;
      }

      break;
    default:
      break;
  }

  if (nodeName === 'input') {
    attributes = { type: 'text', ...attributes };
  }

  for (const [attr, value] of Object.entries(attributes)) {
    if (value === undefined) { continue; }

    if (attr === 'className') {
      if (typeof value === 'object') {
        // use the string representation if available
        if (value.hasOwnProperty('toString')) {
          element.setAttribute('class', String(value));

          continue;
        }

        // otherwise treat as class visibility
        for (const [name, toggle] of Object.entries(value)) {
          element.classList.toggle(name, toggle);
        }

        continue;
      }

      element.setAttribute('class', String(value));

      continue;
    }

    if (attr === 'style' && typeof value === 'object') {
      for (const [name, styleValue] of Object.entries(value)) {
        if (typeof styleValue === 'number' && !unitless.includes(name)) {
          element.style[name] = `${styleValue}px`;

          continue;
        }
        if (name === 'display' && typeof styleValue === 'boolean') {
          element.style.display = styleValue ? 'block' : 'none';

          continue;
        }

        element.style[name] = styleValue;
      }

      continue;
    }

    element.setAttribute(attr, value);
  }

  element.appendChild(fragment(
    children.map(child => (
      (typeof child === 'string' || typeof child === 'number') ? text(child) : child
    ))
  ));

  return element;
}

export const div = el.bind(void 0, 'div');
export const span = el.bind(void 0, 'span');
export const option = el.bind(void 0, 'option');
export const img = el.bind(void 0, 'img');
export const button = el.bind(void 0, 'button');
export const canvas = el.bind(void 0, 'canvas');
export const legend = el.bind(void 0, 'legend');
export const label = el.bind(void 0, 'label');
export const input = el.bind(void 0, 'input');
export const svg = el.bind(void 0, 'svg');
export const circle = el.bind(void 0, 'circle');
export const polygon = el.bind(void 0, 'polygon');
export const rect = el.bind(void 0, 'rect');
export const select = el.bind(void 0, 'select');
export const line = el.bind(void 0, 'line');
export const clipPath = el.bind(void 0, 'clipPath');
export const use = el.bind(void 0, 'use');
export const mask = el.bind(void 0, 'mask');
export const defs = el.bind(void 0, 'defs');
export const path = el.bind(void 0, 'path');
