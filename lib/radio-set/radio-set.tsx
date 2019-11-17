import _ from 'lodash';
import React from 'react';
import OptionalCard from '../_optional-card';
import Grid from '../grid';
import GridItem from '../grid-item';
import Radio from '../radio';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import includes from '../utilities/ts/includes';

interface Radios {
  className?: string;
  id?: string;
  label: string;
  style?: React.CSSProperties;
  value: string;
}

interface Props {
  cards?: boolean;
  className?: string;
  disabled?: boolean;
  message?: string;
  modifiers?: string;
  name?: string;
  onChange?: (value: string, name: string) => void;
  radios: Radios[];
  readOnly?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  value?: string;
}

interface State {
  error: boolean;
  success: boolean;
  value: string;
}

class RadioSet extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    cards: false,
    disabled: false,
    onChange: () => {
      return;
    },
    readOnly: false,
    required: false
  };

  readonly state: Readonly<State> = {
    error: includes(this.props.modifiers, `error`),
    success: includes(this.props.modifiers, `success`),
    value: _.some(this.props.radios, [`value`, this.props.value])
      ? this.props.value
      : ``
  };

  componentDidUpdate(prevProps): void {
    if (prevProps.modifiers !== this.props.modifiers) {
      this.setState({
        error: includes(this.props.modifiers, `error`),
        success: includes(this.props.modifiers, `success`)
      });
    }
  }

  handleChange = (value: string): void => {
    this.setState({
      error: false,
      success: false,
      value
    });

    this.props.onChange(value, this.props.name);
  };

  render() {
    const { props, state, handleChange } = this;

    const error: string = state.error ? `error` : ``;
    const success: string = state.success ? `success` : ``;

    const BEM_MODULE: BEMInterface = BEM(`radio-set`);
    const {
      addClassNames,
      addModifiers,
      getElement,
      getResult
    }: BEMInterface = BEM_MODULE;

    addModifiers(error);
    addModifiers(success);
    addClassNames(props.className);

    const modifiers: string = `${error}${success}`;

    return (
      <div className={getResult()} style={props.style}>
        <Grid modifiers="gutter-x-fixed">
          {props.radios.map((radio, index) => (
            <GridItem key={index} modifiers="s-12 m-6 align-end">
              <OptionalCard
                disabled={props.disabled}
                readOnly={props.readOnly}
                visible={props.cards}>
                <Radio
                  id={radio.id}
                  modifiers={state.value === radio.value ? modifiers : null}
                  className={radio.className}
                  style={radio.style}
                  name={props.name}
                  value={radio.value}
                  disabled={props.disabled}
                  readOnly={props.readOnly}
                  required={!!props.required && index === 0}
                  checked={state.value === radio.value}
                  onChange={handleChange}>
                  {radio.label}
                </Radio>
              </OptionalCard>
            </GridItem>
          ))}
        </Grid>
        <div className={getElement(`border`)} />
        {(!!state.error || !!state.success) && !!props.message && (
          <span className={getElement(`message`)}>{props.message}</span>
        )}
      </div>
    );
  }
}

export { RadioSet as default };