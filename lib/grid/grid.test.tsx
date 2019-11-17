import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import Grid from './grid';

let wrapper: ReactWrapper = null;

describe(`<Grid />`, () => {
  beforeEach(() => {
    wrapper = mount(<Grid>Foo</Grid>);
  });

  it(`Handles props.children`, () => {
    expect(wrapper.text()).toBe(`Foo`);

    wrapper.setProps({ children: `Bar` });
    expect(wrapper.text()).toBe(`Bar`);

    wrapper.setProps({ children: `Baz` });
    expect(wrapper.text()).toBe(`Baz`);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid`
    );

    wrapper.setProps({ className: `bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid bar`
    );

    wrapper.setProps({ className: `bar baz` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid bar baz`
    );
  });

  it(`Handles props.maxWidth`, () => {
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(null);

    wrapper.setProps({ maxWidth: false });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(`max-width: 100%;`);

    wrapper.setProps({ maxWidth: true });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(``);
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid`
    );

    wrapper.setProps({ modifiers: `gutter-fixed` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid ${NAMESPACE}-grid--gutter-fixed`
    );

    wrapper.setProps({ modifiers: `gutter-x-fixed` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid ${NAMESPACE}-grid--gutter-x-fixed`
    );

    wrapper.setProps({ modifiers: `gutter-y-fixed` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid ${NAMESPACE}-grid--gutter-y-fixed`
    );
  });

  it(`Handles props.style`, () => {
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(null);

    wrapper.setProps({ style: { zIndex: `1` } });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(`z-index: 1;`);

    wrapper.setProps({ style: { zIndex: `1`, opacity: 0 } });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(
      `z-index: 1; opacity: 0;`
    );
  });

  it(`Handles props.tag`, () => {
    expect(wrapper.getDOMNode().nodeName).toBe(`DIV`);

    wrapper.setProps({ tag: `section` });
    expect(wrapper.getDOMNode().nodeName).toBe(`SECTION`);

    wrapper.setProps({ tag: `div` });
    expect(wrapper.getDOMNode().nodeName).toBe(`DIV`);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});