/* eslint-env jest */

import { Component } from '../Component';

describe('Component', () => {
  test('Should create a component with empty props object if not provided', () => {
    const component = new Component();
    expect(component.props).toEqual({});
  });

  test('Should create a component with the props passed', () => {
    const props = 100;
    const component = new Component(props);
    expect(component.props).toBe(props);
  });
});
