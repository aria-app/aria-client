import { includes } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import './key.scss';

export class Key extends React.PureComponent {
  static propTypes = {
    onMouseUp: React.PropTypes.func.isRequired,
    step: React.PropTypes.object,
  }

  render() {
    return h('.key', {
      className: this.getClassName(),
      onMouseUp: this.handleMouseUp,
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

  handleMouseUp = () =>
    this.props.onMouseUp(this.props.step);
}
