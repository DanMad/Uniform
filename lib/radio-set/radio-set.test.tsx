import * as React from 'react';

import RadioSet from './radio-set';

import { mount } from 'enzyme';

let wrapper;

describe('<RadioSet />', () => {
  beforeEach(() => {
    wrapper = mount(
      <RadioSet
        radios={[
          { label: 'Foo', value: 'foo' },
          { label: 'Bar', value: 'bar' },
          { label: 'Baz', value: 'baz' },
          { label: 'Qui', value: 'qui' }
        ]}
      />
    );
  });

  it('Handles props.cards', () => {
    expect(wrapper.find('.oc-card').length).toBe(0);

    wrapper.setProps({ cards: true });
    expect(wrapper.find('.oc-card').length).toBe(4);

    wrapper.setProps({ cards: false });
    expect(wrapper.find('.oc-card').length).toBe(0);
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-radio-set');

    wrapper.setProps({ className: 'qux' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-radio-set qux');

    wrapper.setProps({ className: 'qux corge' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-radio-set qux corge'
    );
  });

  it('Handles props.disabled', () => {
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('disabled')
    ).toBe(null);

    wrapper.setProps({ disabled: true });
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('disabled')
    ).toBe('');

    wrapper.setProps({ disabled: false });
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('disabled')
    ).toBe(null);

    wrapper.setProps({ cards: true, disabled: true });
    expect(
      wrapper
        .find('.oc-card')
        .first()
        .getDOMNode()
        .getAttribute('class')
    ).toBe('oc-card oc-card--s oc-card--layer-1');

    wrapper.setProps({ disabled: false });
    expect(
      wrapper
        .find('.oc-card')
        .first()
        .getDOMNode()
        .getAttribute('class')
    ).toBe('oc-card oc-card--s oc-card--clickable');
  });

  it('Handles props.message', () => {
    wrapper.setProps({ modifiers: 'error' });
    expect(wrapper.find('span').length).toBe(0);

    wrapper.setProps({ message: 'Qux' });
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('span').text()).toBe('Qux');

    wrapper.setProps({ modifiers: 'success', message: '' });
    expect(wrapper.find('span').length).toBe(0);

    wrapper.setProps({ message: 'Corge' });
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('span').text()).toBe('Corge');
  });

  it('Handles props.modifiers', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-radio-set');

    wrapper.setProps({ modifiers: 'error' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-radio-set oc-radio-set--error'
    );

    wrapper.setProps({ modifiers: 'success' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-radio-set oc-radio-set--success'
    );
  });

  it('Handles props.name', () => {
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('name')
    ).toBe(null);

    wrapper.setProps({ name: 'qux' });
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('name')
    ).toBe('qux');
    expect(
      wrapper
        .find('input')
        .last()
        .getDOMNode()
        .getAttribute('name')
    ).toBe('qux');

    wrapper.setProps({ name: 'corge' });
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('name')
    ).toBe('corge');
    expect(
      wrapper
        .find('input')
        .last()
        .getDOMNode()
        .getAttribute('name')
    ).toBe('corge');
  });

  it('Handles props.radios', () => {
    expect(wrapper.find('input').length).toBe(4);

    expect(
      wrapper
        .find('.oc-radio__input')
        .at(0)
        .getDOMNode()
        .getAttribute('id')
    ).toBe('oc-37');
    expect(
      wrapper
        .find('.oc-radio__input')
        .at(0)
        .getDOMNode()
        .getAttribute('value')
    ).toBe('foo');
    expect(
      wrapper
        .find('.oc-radio__label')
        .at(0)
        .text()
    ).toBe('Foo');

    expect(
      wrapper
        .find('.oc-radio__input')
        .at(2)
        .getDOMNode()
        .getAttribute('id')
    ).toBe('oc-39');
    expect(
      wrapper
        .find('.oc-radio__input')
        .at(2)
        .getDOMNode()
        .getAttribute('value')
    ).toBe('baz');
    expect(
      wrapper
        .find('.oc-radio__label')
        .at(2)
        .text()
    ).toBe('Baz');

    wrapper.unmount();

    wrapper = mount(
      <RadioSet
        radios={[
          { id: 'qux', label: 'Qux', style: { zIndex: 1 }, value: 'qux' },
          { className: 'thud', id: 'corge', label: 'Corge', value: 'corge' }
        ]}
      />
    );

    expect(wrapper.find('input').length).toBe(2);

    expect(
      wrapper
        .find('.oc-radio')
        .at(0)
        .getDOMNode()
        .getAttribute('style')
    ).toBe('z-index: 1;');
    expect(
      wrapper
        .find('.oc-radio__input')
        .at(0)
        .getDOMNode()
        .getAttribute('id')
    ).toBe('qux');
    expect(
      wrapper
        .find('.oc-radio__input')
        .at(0)
        .getDOMNode()
        .getAttribute('value')
    ).toBe('qux');
    expect(
      wrapper
        .find('.oc-radio__label')
        .at(0)
        .text()
    ).toBe('Qux');

    expect(
      wrapper
        .find('.oc-radio')
        .at(1)
        .getDOMNode()
        .getAttribute('class')
    ).toBe('oc-radio thud');
    expect(
      wrapper
        .find('.oc-radio__input')
        .at(1)
        .getDOMNode()
        .getAttribute('id')
    ).toBe('corge');
    expect(
      wrapper
        .find('.oc-radio__input')
        .at(1)
        .getDOMNode()
        .getAttribute('value')
    ).toBe('corge');
    expect(
      wrapper
        .find('.oc-radio__label')
        .at(1)
        .text()
    ).toBe('Corge');
  });

  it('Handles props.readOnly', () => {
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('readonly')
    ).toBe(null);

    wrapper.setProps({ readOnly: true });
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('readonly')
    ).toBe('');

    wrapper.setProps({ readOnly: false });
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('readonly')
    ).toBe(null);

    wrapper.setProps({ cards: true, readOnly: true });
    expect(
      wrapper
        .find('.oc-card')
        .first()
        .getDOMNode()
        .getAttribute('class')
    ).toBe('oc-card oc-card--s oc-card--layer-1');

    wrapper.setProps({ readOnly: false });
    expect(
      wrapper
        .find('.oc-card')
        .first()
        .getDOMNode()
        .getAttribute('class')
    ).toBe('oc-card oc-card--s oc-card--clickable');
  });

  it('Handles props.required', () => {
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('required')
    ).toBe(null);

    wrapper.setProps({ required: true });
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('required')
    ).toBe('');

    wrapper.setProps({ required: false });
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('required')
    ).toBe(null);
  });

  it('Handles props.style', () => {
    expect(wrapper.getDOMNode().getAttribute('style')).toBe(null);

    wrapper.setProps({ style: { zIndex: '1' } });
    expect(wrapper.getDOMNode().getAttribute('style')).toBe('z-index: 1;');

    wrapper.setProps({ style: { zIndex: '1', opacity: 0 } });
    expect(wrapper.getDOMNode().getAttribute('style')).toBe(
      'z-index: 1; opacity: 0;'
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });
});