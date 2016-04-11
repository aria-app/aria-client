import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './zen-sequence-grid.scss';
import { pitches } from 'helpers/zen-pitches/zen-pitches';
import { ZenSequenceNote } from 'components/zen-sequence-note/zen-sequence-note';

export const ZenSequenceGrid = React.createClass({
  propTypes: {
    notes: PropTypes.array,
    activeSounds: PropTypes.array,
    onSoundPress: PropTypes.func,
  },
  render() {
    return (
      h('div.zen-sequence-grid', [
        h('div.zen-sequence-grid__wrapper', [
          ...this.getRows(),
          this.props.activeSounds.map((note, index) =>
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
  handleSoundPress(sound) {
    this.props.onSoundPress(sound);
  },
  getRows() {
    return this.props.notes.map(note => {
      const name = note.pitch === pitches.C
        ? 'div.zen-sequence-grid__row.zen-sequence-grid__row--c'
        : 'div.zen-sequence-grid__row';
      return h(name, this.getSections(note));
    });
  },
  getSections(note) {
    return _.range(4).map(n =>
      h('div.zen-sequence-grid__section', this.getNotes(note, n))
    );
  },
  getNotes(note, sectionNumber) {
    return _.range(8).map(n =>
      h('div.zen-sequence-grid__slot',
        {
          onClick: () => this.handleSoundPress({
            frequency: note.frequency,
            octave: note.octave,
            pitch: note.pitch,
            time: n + (sectionNumber * 8),
          }),
        },
        [
          h('div.zen-sequence-grid__slot__fill'),
        ]
      )
    );
  },
});
