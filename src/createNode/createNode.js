import { Node } from '../Node';

export function createNode (element, attributes, ...children) {
  return new Node(element, attributes, children);
}
