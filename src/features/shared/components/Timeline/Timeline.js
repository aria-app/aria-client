import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './Timeline.scss';

export class Timeline extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isVisible: PropTypes.bool,
    offset: PropTypes.number.isRequired,
    style: PropTypes.object,
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        style={this.getStyle()}
      />
    );
  }

  getClassName = () =>
    classnames('timeline', this.props.className);

  getStyle = () => ({
    ...this.props.style,
    display: this.props.isVisible ? 'block' : 'none',
    transform: `translateX(${this.props.offset}px)`,
  });
}
