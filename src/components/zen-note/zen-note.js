import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import './zen-note.scss';

export const ZenNote = React.createClass({
  propTypes: {
    octave: PropTypes.number,
    pitch: PropTypes.number,
    time: PropTypes.number,
  },
  render() {
    const bottom = ((this.props.octave * 12) + this.props.pitch) * 40;
    const left = this.props.time * 40;
    return (
      h('div.zen-note', {
        style: { bottom, left },
      }, [
        h('div.zen-note__fill'),
      ])
    );
  },
});
