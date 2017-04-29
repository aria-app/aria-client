import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import './timeline.scss';

export class Timeline extends React.PureComponent {
  static propTypes = {
    className: React.PropTypes.string,
    isVisible: React.PropTypes.bool,
    offset: React.PropTypes.number.isRequired,
    style: StylePropType,
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
