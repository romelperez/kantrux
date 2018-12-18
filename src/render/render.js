import { Node } from '../Node';
import { Component } from '../Component';

const HTML_ATTRIBUTES = {
  className: 'class',
  htmlFor: 'for'
};

function isVoid(data) {
  return data === null || data === void 0 || typeof data === 'boolean';
}

function isString(data) {
  return typeof data === 'string';
}

function isValue(data) {
  return isString(data) || typeof data === 'number';
}

function isFn(data) {
  return typeof data === 'function';
}

function isNode(data) {
  return data instanceof Node;
}

function isComponent(data) {
  return data.prototype instanceof Component;
}

function setHTMLElementStyle(htmlElement, style = {}) {
  Object.keys(style).forEach(name => {
    const value = style[name];
    htmlElement.style[name] = value;
  });
}

function setHTMLElementAttributes(htmlElement, attributes) {
  Object.keys(attributes).forEach(key => {
    const name = HTML_ATTRIBUTES[key] || key;
    const value = attributes[key];
    htmlElement.setAttribute(name, value);
  });
}

function walk(node) {
  const { ref, style, ...htmlAttributes } = node.attributes;

  let chunk;

  if (isString(node.element)) {
    chunk = document.createElement(node.element);

    setHTMLElementStyle(chunk, style);
    setHTMLElementAttributes(chunk, htmlAttributes);

    node.children.forEach(child => {
      let childChunk;

      if (isNode(child)) {
        childChunk = walk(child);
      } else if(isValue(child)) {
        childChunk = document.createTextNode(child);
      } else if (isVoid(child)) {
        return;
      } else {
        throw new Error('Invalid children.');
      }

      chunk.appendChild(childChunk);
    });

    if (ref) {
      ref(chunk);
    }
  } else if (isFn(node.element)) {
    const children = node.children.length === 1 ? node.children[0] : node.children;
    const props = { ...node.attributes, children };

    let instance;
    let executed;

    if (isComponent(node.element)) {
      instance = new node.element(props);
      executed = instance.render();
    } else {
      executed = node.element(props);
    }

    chunk = walk(executed);
  } else {
    throw new Error('Invalid element.');
  }

  return chunk;
}

export function render(parentNode, parentRoot) {
  const dom = walk(parentNode);
  parentRoot.appendChild(dom);
}
