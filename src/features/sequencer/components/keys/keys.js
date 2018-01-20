import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { Key } from '../Key/Key';
import './Keys.scss';

const { scale } = shared.constants;

export class Keys extends React.PureComponent {
  static propTypes = {
    onKeyPress: PropTypes.func.isRequired,
  }

  render() {
    return h('.keys', [
      ...this.getScale().map(step =>
        h(Key, {
          key: step.y,
          onMouseDown: this.handleKeyMouseDown,
          step,
        }),
      ),
    ]);
  }

  getScale = () => scale;

  handleKeyMouseDown = (step) => {
    this.props.onKeyPress(step.y);
  }
}
