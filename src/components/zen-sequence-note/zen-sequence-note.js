import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import './zen-sequence-note.scss';

export const ZenSequenceNote = React.createClass({
  propTypes: {
    octave: PropTypes.number,
    pitch: PropTypes.number,
    time: PropTypes.number,
  },
  render() {
    const bottom = ((this.props.octave * 12) + this.props.pitch) * 40;
    const left = this.props.time * 40;
    return (
      h('div.zen-sequence-note', [
        h('div.zen-sequence-note__point', {
          style: { bottom, left },
        }, [
          h('div.zen-sequence-note__point__fill'),
        ]),
      ])
    );
  },
});
