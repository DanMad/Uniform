import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import Table from './table';

let wrapper: ReactWrapper = null;

describe(`<Table />`, () => {
  beforeEach(() => {
    wrapper = mount(
      <Table>
        <thead />
      </Table>
    );
  });

  it(`Handles props.children`, () => {
    expect(wrapper.html()).toBe(
      `<table class="${NAMESPACE}-table"><thead></thead></table>`
    );

    wrapper.setProps({ children: <tbody /> });
    expect(wrapper.html()).toBe(
      `<table class="${NAMESPACE}-table"><tbody></tbody></table>`
    );
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-table`
    );

    wrapper.setProps({ modifiers: `center` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-table ${NAMESPACE}-table--center`
    );

    wrapper.setProps({ modifiers: `right` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-table ${NAMESPACE}-table--right`
    );
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-table`
    );

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-table foo`
    );

    wrapper.setProps({ className: `foo bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-table foo bar`
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

  afterEach(() => {
    wrapper.unmount();
  });
});