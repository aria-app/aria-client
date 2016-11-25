import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import './button.scss';

export class Button extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    style: StylePropType,
    text: React.PropTypes.string,
  }

  render() {
    return h('.button', {
      onClick: this.handleClick,
      className: this.props.className,
      style: this.props.style,
    }, this.props.text);
  }

  handleClick = () => {
    if (!this.props.onClick) return;
    this.props.onClick();
  }
}
