import _ from 'lodash';
import React from 'react';

import { NAMESPACE } from '../utilities/ts/constants';

import BEM from '../utilities/ts/bem';
import getTimer from './utilities/get-timer';
import getTop from './utilities/get-top';

import Icon from '../icon';

import { TIcon } from '../icon/icon';

interface Props {
  className?: string;
  duration?: number;
  heading: string;
  icon?: TIcon;
  id: string;
  message: string;
  modifiers?: `error` | `success`;
  onClick?: (id: string) => void;
  style?: React.CSSProperties;
}

interface State {
  focus: boolean;
  mounted: boolean;
  mouseOver: boolean;
  top: number;
}

export default class Toast extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    duration: 8000,
    onClick: () => {
      return;
    }
  };

  timer: any = null;
  toastRef: any = React.createRef();

  readonly state: Readonly<State> = {
    focus: false,
    mounted: false,
    mouseOver: false,
    top: null
  };

  componentDidMount(): void {
    this.setState({ mounted: true, top: getTop(this.toastRef.current) });

    if (this.props.modifiers !== `error`) {
      this.timer = new getTimer(this.props.duration, this.handleClick);
    }
  }

  componentDidUpdate(): void {
    if (
      this.state.mounted &&
      this.state.top !== getTop(this.toastRef.current)
    ) {
      this.setState({ top: getTop(this.toastRef.current) });
    }

    if (this.state.mounted === false) {
      setTimeout(() => {
        this.props.onClick(this.props.id);
      }, 500);
    }
  }

  componentWillUnmount(): void {
    if (this.timer) {
      clearTimeout(this.timer.getTimerId());
    }
  }

  handleClick = (): void => {
    const toastRef: any = this.toastRef.current;

    const nextToastRef: any = toastRef.nextSibling;
    const previousToastRef: any = toastRef.previousSibling;

    if (nextToastRef) {
      for (const childNode of nextToastRef.childNodes) {
        if (childNode.hasAttribute(`tabindex`)) {
          childNode.focus();
        }
      }
    } else if (previousToastRef) {
      for (const childNode of previousToastRef.childNodes) {
        if (childNode.hasAttribute(`tabindex`)) {
          childNode.focus();
        }
      }
    }

    this.setState({ focus: false, mounted: false });
  };

  handleMouseEnter = (): void => {
    if (this.props.modifiers !== `error` && !this.state.focus) {
      this.timer.pause();
    }

    this.setState({ mouseOver: true });
  };

  handleMouseLeave = (): void => {
    if (this.props.modifiers !== `error` && !this.state.focus) {
      this.timer.resume();
    }

    this.setState({ mouseOver: false });
  };

  handleFocus = (): void => {
    if (this.props.modifiers !== `error` && !this.state.mouseOver) {
      this.timer.pause();
    }

    this.setState({ focus: true });
  };

  handleBlur = (): void => {
    if (this.props.modifiers !== `error` && !this.state.mouseOver) {
      this.timer.resume();
    }

    this.setState({ focus: false });
  };

  // This method is triggered onKeyDown, because the default scroll behaviour
  // fires before onKeyUp.

  handleKeyDown = (event: any): void => {
    const toastRef: any = this.toastRef.current;

    // 'ArrowLeft' key
    if (event.keyCode === 37) {
      event.preventDefault();
      event.stopPropagation();

      if (toastRef.previousSibling) {
        for (const childNode of toastRef.previousSibling.childNodes) {
          if (childNode.hasAttribute(`tabindex`)) {
            childNode.focus();
            break;
          }
        }
      }
    }

    // 'ArrowUp' key
    if (event.keyCode === 38) {
      event.preventDefault();
      event.stopPropagation();

      if (toastRef.previousSibling) {
        for (const childNode of toastRef.previousSibling.childNodes) {
          if (childNode.hasAttribute(`tabindex`)) {
            childNode.focus();
            break;
          }
        }
      }
    }

    // 'ArrowRight' key
    if (event.keyCode === 39) {
      event.preventDefault();
      event.stopPropagation();

      if (toastRef.nextSibling) {
        for (const childNode of toastRef.nextSibling.childNodes) {
          if (childNode.hasAttribute(`tabindex`)) {
            childNode.focus();
            break;
          }
        }
      }
    }

    // 'ArrowDown' key
    if (event.keyCode === 40) {
      event.preventDefault();
      event.stopPropagation();

      if (toastRef.nextSibling) {
        for (const childNode of toastRef.nextSibling.childNodes) {
          if (childNode.hasAttribute(`tabindex`)) {
            childNode.focus();
            break;
          }
        }
      }
    }
  };

  render() {
    const {
      props,
      state,
      toastRef,
      handleKeyDown,
      handleFocus,
      handleBlur,
      handleMouseEnter,
      handleMouseLeave,
      handleClick
    } = this;

    const bem = BEM(`toast`);
    bem.addModifiers(props.modifiers);
    bem.addClassNames(state.mounted ? `mounted` : ``);
    bem.addClassNames(props.className);

    return (
      <div
        ref={toastRef}
        className={bem.getResult()}
        style={{ top: `${state.top}rem`, ...props.style }}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <h6 className={bem.getElement(`heading`)}>{props.heading}</h6>
        <p className={bem.getElement(`message`)}>{props.message}</p>
        <button
          id={props.id}
          className={bem.getElement(`button`)}
          tabIndex={0}
          title="Close"
          onClick={handleClick}>
          <Icon type="close" visible={true} />
        </button>
        <Icon
          type="close-ring"
          visible={_.includes(_.split(props.modifiers, ` `), `error`)}
        />
        <Icon
          type="tick-ring"
          visible={_.includes(_.split(props.modifiers, ` `), `success`)}
        />
        {props.icon &&
          (!_.includes(_.split(props.modifiers, ` `), `error`) &&
            !_.includes(_.split(props.modifiers, ` `), `success`)) && (
            <Icon type={props.icon} visible={true} />
          )}
      </div>
    );
  }
}
