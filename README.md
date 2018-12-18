<img src="kantrux.png" height="150" alt="Kantrux's logo">

# Kantrux

Ultralight web UI library for building static components with JSX support.

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

```js
/** @jsx createNode */

import { createNode, render, Component } from 'kantrux';

const Title = ({ children }) => <h1>{children}</h1>;

class Content extends Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}

const node = (
  <div className="app">
    <Title>Kantrux</Title>
    <Content>Simple web UI library in JSX!</Content>
  </div>
);
const root = document.querySelector('#root');

render(node, root);

// #root element HTML:
// <div class="app">
//   <h1>Kantrux</h1>
//   <p>Simple web UI library in JSX!</p>
// </div>
```

## Why?

In you don't need to worry about reactivity or stateful components, you can
use this library to build lightweight and simple components.

This is like [Preact](https://preactjs.com) but with simple support for
components with support for JSX.
