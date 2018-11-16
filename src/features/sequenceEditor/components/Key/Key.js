import { includes } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import './Key.scss';

export class Key extends React.PureComponent {
  static propTypes = {
    onMouseDown: PropTypes.func.isRequired,
    step: PropTypes.object,
    style: PropTypes.object,
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        onMouseDown={this.handleMouseDown}
        style={this.props.style}>
        <div
          className="key__label">
          {this.props.step.name}
        </div>
      </div>
    );
  }

  getClassName = () => {
    const letter = this.props.step.name.slice(0, 1).toLowerCase();
    const suffix = includes('#', this.props.step.name)
      ? 'sharp'
      : '';
    return `key key--${letter}${suffix}`;
  };

  handleMouseDown = () =>
    this.props.onMouseDown(this.props.step);
}
