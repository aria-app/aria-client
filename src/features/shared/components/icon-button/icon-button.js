import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import classnames from 'classnames';
import { Icon } from '../icon/icon';
import './icon-button.scss';

export class IconButton extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
    isActive: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    style: StylePropType,
    toolTip: React.PropTypes.string,
  }

  render() {
    return h('.icon-button', {
      className: classnames({
        'icon-button--active': this.props.isActive,
      }, this.props.className),
      onClick: this.props.onClick,
      title: this.props.toolTip,
    }, [
      h('.icon-button__background'),
      h(Icon, {
        className: 'icon-button__icon',
        icon: this.props.icon,
      }),
    ]);
  }
}
