import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import './button.scss';

export class Button extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    text: PropTypes.string,
  }

  render() {
    return h('.button', {
      className: this.props.className,
      onClick: this.handleClick,
      style: this.props.style,
    }, [
      this.props.text,
    ]);
  }

  handleClick = () => {
    if (!this.props.onClick) return;
    this.props.onClick();
  }
}
