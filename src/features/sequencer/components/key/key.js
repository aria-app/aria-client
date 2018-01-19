import { includes } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import './key.scss';

export class Key extends React.PureComponent {
  static propTypes = {
    onMouseDown: PropTypes.func.isRequired,
    step: PropTypes.object,
  }

  render() {
    return h('.key', {
      className: this.getClassName(),
      onMouseDown: this.handleMouseDown,
    }, [
      h('.key__label', [
        this.props.step.name,
      ]),
    ]);
  }

  getClassName = () => {
    const letter = this.props.step.name.slice(0, 1).toLowerCase();
    const suffix = includes('#', this.props.step.name)
      ? 'sharp'
      : '';
    return `key--${letter}${suffix}`;
  };

  handleMouseDown = () =>
    this.props.onMouseDown(this.props.step);
}
