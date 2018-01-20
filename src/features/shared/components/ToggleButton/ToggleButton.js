import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
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
    return h('.toggle-button', {
      className: this.getClassName(),
      onClick: this.props.onClick,
    }, this.props.text);
  }

  getClassName() {
    return classnames({
      'toggle-button--active': this.props.isActive,
    }, this.props.className);
  }
}
