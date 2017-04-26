import invokeArgs from 'lodash/fp/invokeArgs';
import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import classnames from 'classnames';
import { Icon } from '../icon/icon';
import './icon-button.scss';

export class IconButton extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    icon: React.PropTypes.string.isRequired,
    isActive: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    size: React.PropTypes.oneOf(['small', 'regular', 'large', '']),
    style: StylePropType,
    toolTip: React.PropTypes.string,
  }

  render() {
    return h('.icon-button', {
      className: this.getClassName(),
      onClick: this.handleClick,
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
    if (this.props.isDisabled) return undefined;

    return invokeArgs('props.onClick', [e], this);
  };
}
