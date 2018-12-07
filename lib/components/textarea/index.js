import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix, uniqueId, find, remove } from '../utilities';

class OCTextarea extends Component {
  constructor(props) {
    super(props);

    this.textAreaRef = React.createRef();

    this.state = {
      value: this.props.value
        ? this.props.maxLength && this.props.maxLength > 0
          ? this.props.value.length < this.props.maxLength
            ? this.props.value
            : this.props.value.substring(0, this.props.maxLength)
          : this.props.value
        : '',
      remaining: this.props.value
        ? this.props.value.length < this.props.maxLength
          ? this.props.maxLength - this.props.value.length
          : 0
        : this.props.maxLength,
      error: find('textarea--error', this.props.modifiers),
      success: find('textarea--success', this.props.modifiers),
      disabled: find('textarea--disabled', this.props.modifiers)
    };

    this.textAreaHeight = null;
    this.textAreaoffSetHeight = null;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: find('textarea--error', this.props.modifiers),
        success: find('textarea--success', this.props.modifiers),
        disabled: find('textarea--disabled', this.props.modifiers)
      });
    }

    if (this.state.value !== previousState.value) {
      this.setState({
        error: false,
        success: false
      });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  resize = () => {
    let heightOffset = null;
    const node = this.textAreaRef.current;
    node.style.height = '';
    const style = window.getComputedStyle(node, null);

    heightOffset =
      parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    this.textAreaoffSetHeight = node.offsetTop;
    this.textAreaHeight = node.scrollHeight + heightOffset;
    node.style.height = this.textAreaHeight + 'px';

    this.resizeBorder();
    this.resizeParentNode();
  };

  resizeBorder = () => {
    const textAreaSize = this.textAreaHeight;
    const node = this.textAreaRef.current;

    const borderNode = node.parentNode.querySelector(
      '.' + prefix('textarea__border')
    );
    if (borderNode !== null) {
      borderNode.style.top =
        this.textAreaoffSetHeight + textAreaSize - 1 + 'px';
    }
  };

  resizeParentNode = () => {
    const node = this.textAreaRef.current;
    const parentNode = node.parentNode;
    if (parentNode !== null) {
      parentNode.style.height = this.textAreaHeight + 16 * 3 + 'px';
    }
  };

  handleChange = event => {
    this.setState({
      value: event.target.value,
      remaining: event.target.value
        ? event.target.value.length < this.props.maxLength
          ? this.props.maxLength - event.target.value.length
          : 0
        : this.props.maxLength
    });

    this.resize();
  };

  render() {
    const { props, textAreaRef, state, handleChange } = this;

    const modifiers = remove(
      [
        'textarea--disabled',
        'textarea--read-only',
        'textarea--required',
        'textarea--error',
        'textarea--success'
      ],
      props.modifiers
    );

    let hooks = '';

    state.error && (hooks += 'textarea--error ');
    state.success && (hooks += 'textarea--success');

    return (
      <div
        id={props.id ? props.id : uniqueId()}
        className={
          !modifiers
            ? prefix(`textarea ${hooks}`)
            : `${prefix(`textarea ${modifiers} ${hooks}`)}`
        }>
        <textarea
          ref={textAreaRef}
          className={
            !state.value
              ? prefix('textarea__input')
              : prefix('textarea__input active')
          }
          name={props.name}
          disabled={state.disabled}
          required={find(`textarea--required`, props.modifiers)}
          readOnly={find(`textarea--read-only`, props.modifiers)}
          autoComplete={props.autoComplete && props.autoComplete}
          autoFocus={props.autoFocus && props.autoFocus}
          maxLength={
            props.maxLength && props.maxLength > 0 ? props.maxLength : null
          }
          spellCheck={true}
          value={state.value}
          onChange={props.onChange ? props.onChange : handleChange}
        />
        <label className={prefix('textarea__label')}>{props.label}</label>
        {!state.disabled && !state.readOnly && (
          <div className={prefix('textarea__border')} />
        )}
        <span className={prefix('textarea__message')}>
          {state.remaining <= 0
            ? `You've reached ${props.maxLength} characters`
            : `${state.remaining} characters remaining`}
        </span>
      </div>
    );
  }
}

OCTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  modifiers: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func
};

OCTextarea.defaultProps = {
  maxLength: 1000
};

export default OCTextarea;