import { Node } from '../Node';

export function createElement(element, attributes, ...children) {
  return new Node(element, attributes, children);
}
