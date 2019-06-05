import { Component } from '../Component';
import { Node } from '../Node';

const ATTRIBUTES_MAP = {
  className: 'class',
  htmlFor: 'for'
};

function isValue (data) {
  return typeof data === 'string' || typeof data === 'number';
}

function isVoid (data) {
  return data === null || data === void 0 || typeof data === 'boolean';
}

function isNode (data) {
  return data instanceof Node;
}

function isComponent (data) {
  return data.prototype instanceof Component;
}

function isNameEvent (name) {
  return /^on[A-Z][A-Za-z]+$/.test(name);
}

function toHTMLElementEventName (name) {
  return name.replace(/^on/, '').toLowerCase();
}

function setupHTMLElementAttributes (htmlElement, attributes) {
  Object.keys(attributes).forEach(key => {
    const name = ATTRIBUTES_MAP[key] || key;
    const value = attributes[key];

    if (name === 'style') {
      if (!value) return;

      Object.keys(value).forEach(styleKey => {
        const styleValue = value[styleKey];
        htmlElement.style[styleKey] = styleValue;
      });
    }
    else if (name === 'dangerouslySetInnerHTML') {
      if (value && value.__html) {
        htmlElement.innerHTML = value.__html;
      }
    }
    else if (isNameEvent(name)) {
      const eventName = toHTMLElementEventName(name);
      htmlElement.addEventListener(eventName, value);
    }
    else {
      htmlElement.setAttribute(name, value);
    }
  });
}

function setupHTMLElementChildren (htmlElement, children) {
  children.forEach(child => {
    let childChunk;

    if (isNode(child)) {
      childChunk = walk(child);
    }
    else if (isValue(child)) {
      childChunk = document.createTextNode(child);
    }
    else if (isVoid(child)) {
      return;
    }
    else if (Array.isArray(child)) {
      setupHTMLElementChildren(htmlElement, child);
      return;
    }
    else {
      throw new Error('Invalid children.');
    }

    htmlElement.appendChild(childChunk);
  });
}

function setupHTMLElement (element, attributes, children) {
  const htmlElement = document.createElement(element);

  setupHTMLElementAttributes(htmlElement, attributes);
  setupHTMLElementChildren(htmlElement, children);

  return htmlElement;
}

function walk (node) {
  if (!isNode(node)) {
    throw new Error('Invalid node.');
  }

  const { ref, ...attributes } = node.attributes;
  const isHTMLElement = typeof node.element === 'string';
  const isComposedElement = typeof node.element === 'function';

  let chunk;

  if (isHTMLElement) {
    chunk = setupHTMLElement(node.element, attributes, node.children);
    ref && ref(chunk);
  }
  else if (isComposedElement) {
    // If children is only one element, we pass it directly to simplify data manipulation.
    const children = node.children.length === 1 ? node.children[0] : node.children;

    const props = { ...node.attributes, children };

    let nextNode;
    let toReference;

    if (isComponent(node.element)) {
      const instance = new node.element(props); // eslint-disable-line new-cap
      nextNode = instance.render();
      toReference = instance;
    }
    else {
      nextNode = node.element(props);
    }

    chunk = walk(nextNode);
    ref && ref(toReference || chunk);
  }
  else {
    throw new Error('Invalid element.');
  }

  return chunk;
}

export function render (parentNode, parentRoot) {
  const dom = walk(parentNode);
  parentRoot.appendChild(dom);
}
