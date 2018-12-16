/* eslint-env jest */
/** @jsx createElement */

import { createElement } from '../createElement';
import { render } from './render';

describe('render() DOMElements', () => {
  test('Should render DOMElements with "className" prop as "class"', () => {
    const parentRoot = document.createElement('div');
    const parentElement = <div className="content">Content</div>;
    render(parentElement, parentRoot);

    const received = parentRoot.outerHTML;
    const expected = '<div class="content">Content</div>';
    expect(received).toBe(expected);
  });

  test('Should render DOMElements with "htmlFor" prop as "for"', () => {
    const parentRoot = document.createElement('div');
    const parentElement = <div htmlFor="item">Item</div>;
    render(parentElement, parentRoot);

    const received = parentRoot.outerHTML;
    const expected = '<div for="item">Item</div>';
    expect(received).toBe(expected);
  });

  test('Should render DOMElements with "style" prop as directly style modifications', () => {
    const styles = { fontSize: '14px', color: 'blue' };
    const parentRoot = document.createElement('div');
    const parentElement = <div style={styles}>Item</div>;
    render(parentElement, parentRoot);

    const received = parentRoot.outerHTML;
    const expected = '<div style="font-size: 14px;color: blue;">Item</div>';
    expect(received).toBe(expected);
  });

  test('Should render DOMElements with provided events, props matching "/^on[A-Z][A-Za-z]+/"', () => {
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const parentRoot = document.createElement('div');
    const parentElement = <button onClick={onClick} onFocus={onFocus}>Item</button>;
    render(parentElement, parentRoot);

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
    const parentElement = <div>Hello{true} every{undefined}one{null} {10}!</div>;
    render(parentElement, parentRoot);

    const received = parentRoot.outerHTML;
    const expected = '<div>Hello everyone 10!</div>';
    expect(received).toBe(expected);
  });

  test('Should throw error if DOMElements have invalid types', () => {
    const parentRoot = document.createElement('div');
    const parentElement = <div>Hello{{}} everyone{/a/}!</div>;
    const fn = () => render(parentElement, parentRoot);
    expect(fn).toThrow('Invalid children.');
  });
});
