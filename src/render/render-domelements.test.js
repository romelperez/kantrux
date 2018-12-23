/* eslint-env jest */
/** @jsx createNode */

import { createNode } from '../createNode';
import { render } from './render';

describe('render() DOMElements', () => {
  test('Should render DOMElements with "className" prop as "class"', () => {
    const parentRoot = document.createElement('div');
    const parentNode = <div className="content">Content</div>;
    render(parentNode, parentRoot);

    const received = parentRoot.innerHTML;
    const expected = '<div class="content">Content</div>';
    expect(received).toBe(expected);
  });

  test('Should render DOMElements with "htmlFor" prop as "for"', () => {
    const parentRoot = document.createElement('div');
    const parentNode = <div htmlFor="item">Item</div>;
    render(parentNode, parentRoot);

    const received = parentRoot.innerHTML;
    const expected = '<div for="item">Item</div>';
    expect(received).toBe(expected);
  });

  test('Should render DOMElements with "style" prop as directly style modifications', () => {
    const styles = { fontSize: '14px', color: 'blue' };
    const parentRoot = document.createElement('div');
    const parentNode = <div style={styles}>Item</div>;
    render(parentNode, parentRoot);

    const received = parentRoot.innerHTML;
    const expected = '<div style="font-size: 14px; color: blue;">Item</div>';
    expect(received).toBe(expected);
  });

  test('Should render DOMElements with provided events, props matching "/^on[A-Z][A-Za-z]+/"', () => {
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const parentRoot = document.createElement('div');
    const parentNode = (
      <button onClick={onClick} onFocus={onFocus}>
        Item
      </button>
    );
    render(parentNode, parentRoot);

    const button = parentRoot.querySelector('button');
    const clickEvent = new Event('click');
    const focusEvent = new Event('focus');
    button.dispatchEvent(clickEvent);
    button.dispatchEvent(focusEvent);

    expect(onClick).toHaveBeenCalledWith(clickEvent);
    expect(onFocus).toHaveBeenCalledWith(focusEvent);
  });

  test('Should only render DOMElements strings/numbers and ignore void values', () => {
    const parentRoot = document.createElement('div');
    const parentNode = (
      <div>
        Hello{true} every{undefined}one{null} {10}!
      </div>
    );
    render(parentNode, parentRoot);

    const received = parentRoot.innerHTML;
    const expected = '<div>Hello everyone 10!</div>';
    expect(received).toBe(expected);
  });

  test('Should render HTML strings as strings', () => {
    const html = '<b>Over<br>Here</b>';
    const parentNode = <div>Hello {html}!</div>;
    const parentRoot = document.createElement('div');
    render(parentNode, parentRoot);

    const received = parentRoot.innerHTML;
    const expected = '<div>Hello &lt;b&gt;Over&lt;br&gt;Here&lt;/b&gt;!</div>';
    expect(received).toBe(expected);
  });

  test('Should render HTML strings only by prop "html"', () => {
    const html = 'Hello <b>Over<br>Here</b>!';
    const parentNode = <div html={html} />;
    const parentRoot = document.createElement('div');
    render(parentNode, parentRoot);

    const received = parentRoot.innerHTML;
    const expected = '<div>Hello <b>Over<br>Here</b>!</div>';
    expect(received).toBe(expected);
  });

  test('Should throw error if DOMElements have invalid types', () => {
    const parentRoot = document.createElement('div');
    const fn1 = () => render(<div>Hello{{}}!</div>, parentRoot);
    const fn2 = () => render(<div>Hello{/a/}!</div>, parentRoot);
    expect(fn1).toThrow('Invalid children.');
    expect(fn2).toThrow('Invalid children.');
  });
});
