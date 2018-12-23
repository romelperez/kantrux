import { Component } from '../Component';
import { Node } from '../Node';

const ATTRIBUTES_MAP = {
  className: 'class',
  htmlFor: 'for'
};

function isValue(data): boolean {
  return typeof data === 'string' || typeof data === 'number';
}

function isVoid(data): boolean {
  return data === null || data === void 0 || typeof data === 'boolean';
}

function isNode(data): boolean {
  return data instanceof Node;
}

function isComponent(data): boolean {
  return data.prototype instanceof Component;
}

function isNameEvent(name: string): boolean {
  return /^on[A-Z][A-Za-z]+$/.test(name);
}

function toHTMLElementEventName(name: string): string {
  return name.replace(/^on/, '').toLowerCase();
}

function setupHTMLElement(
  element: string,
  attributes: Object,
  children: Array
) {
  const htmlElement = document.createElement(element);

  Object.keys(attributes).forEach(key => {
    const name = ATTRIBUTES_MAP[key] || key;
    const value = attributes[key];

    if (name === 'style') {
      Object.keys(value).forEach(styleKey => {
        const styleValue = value[styleKey];
        htmlElement.style[styleKey] = styleValue;
      });
    } else if (name === 'html') {
      htmlElement.innerHTML = value;
    } else if (isNameEvent(name)) {
      const eventName = toHTMLElementEventName(name);
      htmlElement.addEventListener(eventName, value);
    } else {
      htmlElement.setAttribute(name, value);
    }
  });

  children.forEach(child => {
    let childChunk;

    if (isNode(child)) {
      childChunk = walk(child);
    } else if (isValue(child)) {
      childChunk = document.createTextNode(child);
    } else if (isVoid(child)) {
      return;
    } else {
      throw new Error('Invalid children.');
    }

    htmlElement.appendChild(childChunk);
  });

  return htmlElement;
}

function walk(node: Node) {
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
  } else if (isComposedElement) {
    // If children is only one element, we pass it directly to simplify data manipulation.
    const children =
      node.children.length === 1 ? node.children[0] : node.children;

    const props = { ...node.attributes, children };

    let nextNode;
    let toReference;

    if (isComponent(node.element)) {
      const instance = new node.element(props);
      nextNode = instance.render();
      toReference = instance;
    } else {
      nextNode = node.element(props);
    }

    chunk = walk(nextNode);
    ref && ref(toReference || chunk);
  } else {
    throw new Error('Invalid element.');
  }

  return chunk;
}

export function render(parentNode: Node, parentRoot: HTMLElement) {
  const dom = walk(parentNode);
  parentRoot.appendChild(dom);
}
