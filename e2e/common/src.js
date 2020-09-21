/* eslint-disable react/prop-types */

import { createNode, render, Component } from '../../lib';

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
  createNode(Content, { className: 'content' }, 'An example using CommonJS!')
);
const root = document.querySelector('#root');

render(node, root);
