import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { Key } from '../key/key';
import './keys.scss';

const { scale } = shared.constants;

export class Keys extends React.PureComponent {
  static propTypes = {
    onKeyPress: PropTypes.func.isRequired,
  }

  render() {
    return h('.keys', [
      ...this.getScale().map(step => h(Key, {
        key: step.y,
        onMouseUp: this.handleKeyMouseUp,
        step,
      })),
    ]);
  }

  getScale = () => scale;

  handleKeyMouseUp = (step) => {
    this.props.onKeyPress({
      y: step.y,
    });
  }
}
