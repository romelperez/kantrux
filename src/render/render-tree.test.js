/* eslint-env jest */
/** @jsx createNode */

import { Component } from '../Component';
import { createNode } from '../createNode';
import { render } from './render';

describe('render() tree', () => {
  test('Should render basic HTMLElements tree', () => {
    const parentNode = <div name='parent'>Hello</div>;
    const parentRoot = document.createElement('div');
    render(parentNode, parentRoot);

    const received = parentRoot.innerHTML;
    const expected = '<div name="parent">Hello</div>';
    expect(received).toBe(expected);
  });

  test('Should render nested HTMLElements tree', () => {
    const parentRoot = document.createElement('div');
    const parentNode = (
      <header className='heading'>
        <h1>Hello</h1>
        <ul name='nav'>
          <li>
            <a href='/'>home</a>
          </li>
          <li>
            <a href='/about'>about</a>
          </li>
        </ul>
      </header>
    );
    render(parentNode, parentRoot);

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

  test('Should render arrays in HTMLElements tree', () => {
    const parentRoot = document.createElement('div');
    const parentNode = (
      <header className='heading'>
        <h1>Hello</h1>
        {[
          'Hi',
          <i>Everyone</i>,
          <u>Here</u>
        ]}
      </header>
    );
    render(parentNode, parentRoot);

    const received = parentRoot.innerHTML;
    const expected = [
      '<header class="heading">',
      '<h1>Hello</h1>',
      'Hi',
      '<i>Everyone</i>',
      '<u>Here</u>',
      '</header>'
    ].join('');
    expect(received).toBe(expected);
  });

  test('Should render functions components', () => {
    const Title = ({ name, children }) => ( // eslint-disable-line react/prop-types
      <h1 name={name}>Title: {children}</h1>
    );
    const parentRoot = document.createElement('div');
    const parentNode = (
      <div name='parent'>
        <Title name='title'>Welcome</Title>
        <p>Content</p>
      </div>
    );
    render(parentNode, parentRoot);

    const received = parentRoot.innerHTML;
    const expected =
      '<div name="parent"><h1 name="title">Title: Welcome</h1><p>Content</p></div>';
    expect(received).toBe(expected);
  });

  test('Should render class components', () => {
    class Header extends Component {
      render () {
        const { name, children } = this.props; // eslint-disable-line react/prop-types
        return (
          <header name={name}>
            <h1 className='title'>{children}</h1>
            <h2>Best heading ever!</h2>
          </header>
        );
      }
    }

    const parentRoot = document.createElement('div');
    const parentNode = (
      <div>
        <Header name='header'>Welcome</Header>
        <p>Content</p>
      </div>
    );
    render(parentNode, parentRoot);

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
    const Title = () => [<h1>Hi</h1>, <h2>All</h2>];
    const parentNode = (
      <div>
        <Title />
        <p>Everyone</p>
      </div>
    );
    const parentRoot = document.createElement('div');
    const fn = () => render(parentNode, parentRoot);
    expect(fn).toThrow('Invalid node.');
  });

  test('Should not allow multiple direct children on class components', () => {
    class Title extends Component {
      render () {
        return [<h1>Hello</h1>, <h2>All</h2>];
      }
    }
    const parentNode = (
      <div>
        <Title />
        <p>Everyone</p>
      </div>
    );
    const parentRoot = document.createElement('div');
    const fn = () => render(parentNode, parentRoot);
    expect(fn).toThrow('Invalid node.');
  });
});
