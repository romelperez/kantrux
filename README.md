<img src="kantrux.png" height="150" alt="Kantrux's logo">

# Kantrux

Ultralight web UI library for building static components with [JSX](https://facebook.github.io/jsx/) support.

<a href="https://npmjs.org/package/kantrux">
  <img src="https://img.shields.io/npm/v/kantrux.svg" alt="version" />
</a>
<a href="https://travis-ci.org/romelperez/kantrux">
  <img src="https://img.shields.io/travis/romelperez/kantrux.svg" alt="travis" />
</a>
<a href="https://github.com/romelperez/kantrux/blob/master/LICENSE">
  <img src="https://img.shields.io/github/license/romelperez/kantrux.svg?maxAge=2592000" alt="license" />
</a>
<a href="https://github.com/prettier/prettier">
  <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="code style: prettier">
</a>
<a href="https://npmjs.org/package/kantrux">
  <img src="https://img.shields.io/npm/dm/kantrux.svg" alt="downloads" />
</a>
<a href="https://github.com/romelperez/kantrux">
  <img src="https://img.shields.io/github/stars/romelperez/kantrux.svg?style=social&label=stars" alt="github stars" />
</a>

## Install

```bash
$ npm install kantrux
```

## How to use

### JSX

```js
/** @jsx createNode */

import { createNode, render, Component } from 'kantrux';

const Title = ({ className, children }) => (
  <h1 className={className}>{children}</h1>
);

class Content extends Component {
  render() {
    const { className, children } = this.props;
    return <p className={className}>{children}</p>;
  }
}

const node = (
  <div className="app">
    <Title className="title">Kantrux</Title>
    <Content className="content">Simple web UI library in JSX!</Content>
  </div>
);
const root = document.querySelector('#root');

render(node, root);

// #root element HTML:
// <div class="app">
//   <h1 class="title">Kantrux</h1>
//   <p class="content">Simple web UI library in JSX!</p>
// </div>
```

### Vanilla

```js
import { createNode, render, Component } from 'kantrux';

const Title = ({ className, children }) => (
  createNode('h1', { className }, children)
);

class Content extends Component {
  render() {
    const { className, children } = this.props;
    return createNode('p', { className }, children);
  }
}

const node = createNode(
  'div',
  { classname: 'app' },
  createNode(Title, { className: 'title' }, 'Kantrux'),
  createNode(Content, { className: 'content' }, 'Simple web UI library in JSX!')
);
const root = document.querySelector('#root');

render(node, root);

// #root element HTML:
// <div class="app">
//   <h1 class="title">Kantrux</h1>
//   <p class="content">Simple web UI library in JSX!</p>
// </div>
```

## Why?

If you don't need to worry about reactivity, stateful or contextful components,
lifecycle hooks, or asynchronous patterns, you can use this library to build
lightweight and simple components.

## Features

This is like [Preact](https://preactjs.com) but with simple support for components.

- `HTMLElement` components as string nodes
- Function components
    - Accepts props as argument
    - Returns node
- Class components
    - Use `constructor` for component setup
    - Use `render` to define component
- Components definition with [JSX](https://facebook.github.io/jsx/) using `createNode` as pragma:
    - Using [Babel 6 plugin](https://babeljs.io/docs/en/6.26.3/babel-plugin-transform-react-jsx) `["transform-react-jsx", { "pragma":"createNode" }]`
    - Using [Babel 7 plugin](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) `["@babel/plugin-transform-react-jsx", { "pragma":"createNode" }]`
    - File inline `/** @jsx createNode */` using Babel (either 6 or 7)
- Custom HTML attributes as props:
    - `class` as `className`
    - `for` as `htmlFor`
- `ref` prop support
- `style` prop as object support
- To render HTML string children, use `html` prop
- Asynchronous rendering
- No `state` support
- No `context` support
- No hooks
- No support for SVG
