/* eslint-env jest */
/** @jsx createNode */

import { createNode } from '../createNode';
import { Component } from '../Component';
import { render } from './render';

describe('render() refs', () => {
  test('Should get reference to HTMLElement', () => {
    let componentReference;
    const ref = providedReference => (componentReference = providedReference);
    const parentNode = <h1 ref={ref}>Hello</h1>;
    const parentRoot = document.createElement('div');
    render(parentNode, parentRoot);

    expect(componentReference).toBeInstanceOf(HTMLElement);
    expect(componentReference.outerHTML).toBe('<h1>Hello</h1>');
  });

  test('Should get reference to direct children on function components', () => {
    let componentReference;
    const ref = providedReference => (componentReference = providedReference);
    const Title = () => <h1>Hello</h1>;
    const parentNode = <Title ref={ref}>Hello</Title>;
    const parentRoot = document.createElement('div');
    render(parentNode, parentRoot);

    expect(componentReference).toBeInstanceOf(HTMLElement);
    expect(componentReference.outerHTML).toBe('<h1>Hello</h1>');
  });

  test('Should get reference to component instance on class components', () => {
    let componentReference;
    const ref = providedReference => (componentReference = providedReference);
    class Title extends Component {
      render () {
        const { children } = this.props; // eslint-disable-line react/prop-types
        return <h1>{children}</h1>;
      }
    }
    const parentNode = <Title ref={ref}>Hello</Title>;
    const parentRoot = document.createElement('div');
    render(parentNode, parentRoot);

    expect(componentReference).toBeInstanceOf(Title);
  });
});
