/* eslint-env jest */

import { Node } from './Node';

describe('Node', () => {
  test('Should create a node with empty attributes object if not provided', () => {
    const node = new Node(1, null, 3);
    expect(node.element).toBe(1);
    expect(node.attributes).toEqual({});
    expect(node.children).toBe(3);
  });

  test('Should create a node with empty children array if not provided', () => {
    const node = new Node(1, 2);
    expect(node.element).toBe(1);
    expect(node.attributes).toBe(2);
    expect(node.children).toEqual([]);
  });

  test('Should create a node with provided parameters', () => {
    const node = new Node(1, 2, 3);
    expect(node.element).toBe(1);
    expect(node.attributes).toBe(2);
    expect(node.children).toBe(3);
  });
});
