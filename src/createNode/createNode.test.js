/* eslint-env jest */
/** @jsx createNode */

import { Node } from '../Node';
import { createNode } from './createNode';

describe('createNode()', () => {
  test('Should create node tree with provided data structure', () => {
    const withStr = 'over here';
    const withNum = 100;
    const tree = (
      <header>
        <h1 name="title">Hello!</h1>
        <div name="description">
          Awesome {withStr} <b>fun {withNum}</b>!
        </div>
      </header>
    );

    expect(tree).toBeInstanceOf(Node);

    expect(tree.children.length).toBe(2);
    expect(tree.children[0]).toBeInstanceOf(Node);
    expect(tree.children[0].children.length).toBe(1);
    expect(tree.children[0].children[0]).toBe('Hello!');

    expect(tree.children[1]).toBeInstanceOf(Node);
    expect(tree.children[1].children.length).toBe(5);

    expect(tree.children[1].children[0]).toBeString();
    expect(tree.children[1].children[1]).toBeString();
    expect(tree.children[1].children[2]).toBeString();

    expect(tree.children[1].children[3]).toBeInstanceOf(Node);
    expect(tree.children[1].children[3].children.length).toBe(2);
    expect(tree.children[1].children[3].children[0]).toBeString();
    expect(tree.children[1].children[3].children[1]).toBeNumber();

    expect(tree.children[1].children[4]).toBeString();
  });

  test('Should create node tree with provided props', () => {
    const withStr = 'over here';
    const withNum = 100;
    const tree = (
      <header>
        <h1 name="title">Hello!</h1>
        <div name="description">
          Awesome {withStr} <b>fun {withNum}</b>!
        </div>
      </header>
    );

    expect(tree.element).toBe('header');
    expect(tree.attributes).toEqual({});

    expect(tree.children[0].element).toBe('h1');
    expect(tree.children[0].attributes).toEqual({ name: 'title' });
    expect(tree.children[0].children.length).toBe(1);
    expect(tree.children[0].children[0]).toBe('Hello!');

    expect(tree.children[1].element).toBe('div');
    expect(tree.children[1].attributes).toEqual({ name: 'description' });

    expect(tree.children[1].children[0]).toBe('Awesome ');
    expect(tree.children[1].children[1]).toBe(withStr);
    expect(tree.children[1].children[2]).toBe(' ');

    expect(tree.children[1].children[3].element).toBe('b');
    expect(tree.children[1].children[3].attributes).toEqual({});
    expect(tree.children[1].children[3].children[0]).toBe('fun ');
    expect(tree.children[1].children[3].children[1]).toBe(withNum);

    expect(tree.children[1].children[4]).toBe('!');
  });

  test('Should creates node tree with classes and functions', () => {
    class MyClass {}
    const MyFn = () => 'hello';
    const tree = (
      <MyClass>
        <h1>Heading</h1>
        <MyFn>Content</MyFn>
      </MyClass>
    );

    expect(tree.element).toBe(MyClass);
    expect(tree.children[0].element).toBeString();
    expect(tree.children[1].element).toBe(MyFn);
  });
});
