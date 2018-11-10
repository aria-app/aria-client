import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { Icon } from '../Icon/Icon';
import './IconButton.scss';

export class IconButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    getRef: PropTypes.func,
    icon: PropTypes.string,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'regular', 'large', '']),
    style: PropTypes.object,
    toolTip: PropTypes.string,
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        onClick={this.handleClick}
        ref={this.props.getRef}
        style={this.props.style}
        title={this.props.toolTip}>
        <div
          className="icon-button__background"
        />
        <Icon
          className="icon-button__icon"
          icon={this.props.icon}
          size={this.props.size}
        />
      </div>
    );
  }

  getClassName() {
    return classnames('icon-button', {
      'icon-button--active': this.props.isActive,
      'icon-button--disabled': this.props.isDisabled,
    }, this.props.className);
  }

  handleClick = (e) => {
    if (this.props.isDisabled) return;

    this.props.onClick(e);
  };
}
