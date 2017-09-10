import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import { Icon } from '../icon/icon';
import './icon-button.scss';

export class IconButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['small', 'regular', 'large', '']),
    style: PropTypes.object,
    toolTip: PropTypes.string,
  }

  render() {
    return h('.icon-button', {
      className: this.getClassName(),
      onClick: this.handleClick,
      style: this.props.style,
      title: this.props.toolTip,
    }, [
      h('.icon-button__background'),
      h(Icon, {
        className: 'icon-button__icon',
        icon: this.props.icon,
        size: this.props.size,
      }),
    ]);
  }

  getClassName() {
    return classnames({
      'icon-button--active': this.props.isActive,
      'icon-button--disabled': this.props.isDisabled,
    }, this.props.className);
  }

  handleClick = (e) => {
    if (this.props.isDisabled) return;

    this.props.onClick(e);
  };
}
