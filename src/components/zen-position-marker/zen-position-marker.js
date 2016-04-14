import React from 'react';
import h from 'react-hyperscript';
import './zen-position-marker.scss';

export const ZenPositionMarker = React.createClass({
  propTypes: {
    position: React.PropTypes.number,
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.position !== this.props.position;
  },
  render() {
    const left = this.props.position * 40;

    return h('.zen-position-marker', {
      style: { left },
    });
  },
});
