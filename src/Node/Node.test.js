/* eslint-env jest */
/** @jsx createElement */

import { Node } from './Node';

describe('Node', () => {
  test('Should create a node with provided parameters', () => {
    const node = new Node(1, 2, 3);
    expect(node.element).toBe(1);
    expect(node.attributes).toBe(2);
    expect(node.children).toBe(3);
  });
});
