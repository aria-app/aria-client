import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import './zen-notes.scss';
import { ZenNote } from 'components/zen-note/zen-note';

export const ZenNotes = React.createClass({
  propTypes: {
    notes: PropTypes.array,
  },
  render() {
    console.log(this.props.notes);
    return (
      h('div.zen-notes', this.props.notes.map((note, index) =>
        h(ZenNote, {
          key: index,
          octave: note.octave,
          pitch: note.pitch,
          time: note.time,
        })
      ))

    );
  },
});
