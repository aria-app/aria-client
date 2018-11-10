import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import './ToggleButton.scss';

export class ToggleButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    text: PropTypes.string,
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        onClick={this.props.onClick}>
        {this.props.text}
      </div>
    );
  }

  getClassName() {
    return classnames('toggle-button', {
      'toggle-button--active': this.props.isActive,
    }, this.props.className);
  }
}
