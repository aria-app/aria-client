import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './zen-sequence-grid.scss';
import { pitches } from 'helpers/zen-pitches/zen-pitches';
import { ZenSequenceNote } from 'components/zen-sequence-note/zen-sequence-note';

export const ZenSequenceGrid = React.createClass({
  propTypes: {
    notes: PropTypes.array,
    activeNotes: PropTypes.array,
  },
  render() {
    return (
      h('div.zen-sequence-grid', [
        h('div.zen-sequence-grid__wrapper', [
          ...this.getRows(),
          this.props.activeNotes.map((note, index) =>
            h(ZenSequenceNote, {
              key: index,
              octave: note.octave,
              pitch: note.pitch,
              time: note.time,
            })
          ),
        ]),
      ])
    );
  },
  getRows() {
    const slots = _.range(8).map(() =>
      h('div.zen-sequence-grid__slot', [h('div.zen-sequence-grid__slot__fill')])
    );

    const sections = _.range(4).map(() =>
      h('div.zen-sequence-grid__section', slots)
    );

    return this.props.notes.map(note => {
      const name = note.pitch === pitches.C
        ? 'div.zen-sequence-grid__row.zen-sequence-grid__row--c'
        : 'div.zen-sequence-grid__row';
      return h(name, sections);
    });
  },
});
