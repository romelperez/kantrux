![Kantrux](https://github.com/romelperez/kantrux/raw/main/kantrux.jpg)

# Kantrux

Ultralight web UI library for building static components with [JSX](https://facebook.github.io/jsx/) support.

[![version](https://img.shields.io/npm/v/kantrux.svg)](https://npmjs.org/package/kantrux)
[![travis](https://img.shields.io/travis/romelperez/kantrux.svg)](https://travis-ci.org/romelperez/kantrux)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/kantrux.svg)](https://npmjs.org/package/kantrux)
[![downloads](https://img.shields.io/npm/dm/kantrux.svg)](https://npmjs.org/package/kantrux)
[![github stars](https://img.shields.io/github/stars/romelperez/kantrux.svg?style=social&label=stars)](https://github.com/romelperez/kantrux)
[![license](https://img.shields.io/github/license/romelperez/kantrux.svg?maxAge=2592000)](https://github.com/romelperez/kantrux/blob/main/LICENSE)
[![code style: standardjs](https://img.shields.io/badge/code_style-standardjs-d2bb09.svg?style=flat-square)](https://standardjs.com)

## Install

### CommonJS

```bash
$ npm install kantrux
```

### UMD

```html
<script src="https://unpkg.com/kantrux/dist/kantrux.js"></script>
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
  render () {
    const { className, children } = this.props;
    return <p className={className}>{children}</p>;
  }
}

const node = (
  <div className='app'>
    <Title className='title'>Kantrux</Title>
    <Content className='content'>Simple web UI library in JSX!</Content>
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
  render () {
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

- Synchronous rendering
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
- `ref` prop function support
- `style` prop as object support
- `dangerouslySetInnerHTML: { __html }` support
- No special treatment for forms
- No `propTypes` nor `defaultProps`
- No `state` support
- No `context` support
- No lists `key` support
- No hooks
- No support for SVG

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://RomelPerez.com"><img src="https://avatars2.githubusercontent.com/u/1393135?v=4" width="100px;" alt="Romel Pérez"/><br /><sub><b>Romel Pérez</b></sub></a><br /><a href="#projectManagement-romelperez" title="Project Management">📆</a> <a href="https://github.com/romelperez/kantrux/commits?author=romelperez" title="Code">💻</a> <a href="https://github.com/romelperez/kantrux/commits?author=romelperez" title="Documentation">📖</a> <a href="#question-romelperez" title="Answering Questions">💬</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors)
specification.

## About

Kantrux's logo is a photo of a bird named Barranquero endemic from Colombia.

A colorful large bird that has a heavy bill and long tails with a distinctive
racquet-like tip and known to nest in tunnels in river ban. Solitary or in pairs.
Feed on fruit and insects on ground.

Source: [birdsofcolombia.com](https://birdsofcolombia.com).
