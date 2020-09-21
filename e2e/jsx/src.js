/** @jsx createNode */
/* eslint-disable react/prop-types */

import { createNode, render, Component } from '../../lib';

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
    <Content className='content'>An example using JSX!</Content>
  </div>
);
const root = document.querySelector('#root');

render(node, root);
