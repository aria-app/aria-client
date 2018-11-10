import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './Button.scss';

export class Button extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    text: PropTypes.string,
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        onClick={this.handleClick}
        style={this.props.style}>
        {this.props.text}
      </div>
    );
  }

  getClassName = () =>
    classnames('button', this.props.className);

  handleClick = () => {
    if (!this.props.onClick) return;
    this.props.onClick();
  }
}
