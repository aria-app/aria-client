import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import './timeline.scss';

export class Timeline extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    isVisible: React.PropTypes.bool,
    offset: React.PropTypes.number.isRequired,
    style: StylePropType,
  }

  render() {
    return h('.timeline', {
      style: {
        display: this.getDisplay(),
        transform: this.getTransform(),
      },
    });
  }

  getDisplay() {
    return this.props.isVisible ? 'block' : 'none';
  }

  getTransform() {
    return `translateX(${this.props.offset}px)`;
  }
}
