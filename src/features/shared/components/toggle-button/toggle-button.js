import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import './toggle-button.scss';

export class ToggleButton extends React.PureComponent {
  static propTypes = {
    className: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    text: React.PropTypes.string,
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
