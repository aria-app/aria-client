import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import './timeline.scss';

export class Timeline extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isVisible: PropTypes.bool,
    offset: PropTypes.number.isRequired,
    style: PropTypes.object,
  }

  render() {
    return h('.timeline', {
      className: this.props.className,
      style: this.getStyle(),
    });
  }

  getStyle = () => ({
    ...this.props.style,
    display: this.props.isVisible ? 'block' : 'none',
    transform: `translateX(${this.props.offset}px)`,
  });
}
