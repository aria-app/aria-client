import Dawww from 'dawww';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { Key } from '../Key/Key';
import './Keys.scss';

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

  getScale = () => Dawww.SCALE;

  handleKeyMouseDown = (step) => {
    this.props.onKeyPress(step.y);
  }
}
