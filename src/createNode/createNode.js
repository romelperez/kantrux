import { Node } from '../Node';

export function createNode(element, attributes: Object, ...children): Node {
  return new Node(element, attributes, children);
}
