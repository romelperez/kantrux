/* eslint-env jest */
/** @jsx createElement */

import { Component } from '../Component';
import { createElement } from '../createElement';
import { render } from './render';

describe('render() tree', () => {
  test('Should render basic HTMLElements tree', () => {
    const parentElement = <div name="parent">Hello</div>;
    const parentRoot = document.createElement('div');
    render(parentElement, parentRoot);

    const received = parentRoot.innerHTML;
    const expected = '<div name="parent">Hello</div>';
    expect(received).toBe(expected);
  });

  test('Should render nested HTMLElements tree', () => {
    const parentRoot = document.createElement('div');
    const parentElement = (
      <header className="heading">
        <h1>Hello</h1>
        <ul name="nav">
          <li><a href="/">home</a></li>
          <li><a href="/about">about</a></li>
        </ul>
      </header>
    );
    render(parentElement, parentRoot);

    const received = parentRoot.innerHTML;
    const expected = [
      '<header class="heading">',
      '<h1>Hello</h1>',
      '<ul name="nav">',
      '<li><a href="/">home</a></li>',
      '<li><a href="/about">about</a></li>',
      '</ul>',
      '</header>'
    ].join('');
    expect(received).toBe(expected);
  });

  test('Should render functions components', () => {
    const Title = ({ name, children }) => <h1 name={name}>Title: {children}</h1>;
    const parentRoot = document.createElement('div');
    const parentElement = (
      <div name="parent">
        <Title name="title">Welcome</Title>
        <p>Content</p>
      </div>
    );
    render(parentElement, parentRoot);

    const received = parentRoot.innerHTML;
    const expected = '<div name="parent"><h1 name="title">Title: Welcome</h1><p>Content</p></div>';
    expect(received).toBe(expected);
  });

  test('Should render class components', () => {
    class Header extends Component {
      render() {
        const { name, children } = this.props;
        return (
          <header name={name}>
            <h1 className="title">{children}</h1>
            <h2>Best heading ever!</h2>
          </header>
        );
      }
    }

    const parentRoot = document.createElement('div');
    const parentElement = (
      <div>
        <Header name="header">Welcome</Header>
        <p>Content</p>
      </div>
    );
    render(parentElement, parentRoot);

    const received = parentRoot.innerHTML;
    const expected = [
      '<div>',
      '<header name="header">',
      '<h1 class="title">Welcome</h1>',
      '<h2>Best heading ever!</h2>',
      '</header>',
      '<p>Content</p>',
      '</div>'
    ].join('');
    expect(received).toBe(expected);
  });

  test('Should not allow multiple direct children on function components', () => {
    // TODO:
  });

  test('Should not allow multiple direct children on class components', () => {
    // TODO:
  });
});
