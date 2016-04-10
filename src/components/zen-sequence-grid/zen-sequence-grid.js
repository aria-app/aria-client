import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './zen-sequence-grid.scss';
import { ZenSequenceNote } from '../zen-sequence-note/zen-sequence-note';

export const ZenSequenceGrid = React.createClass({
  propTypes: {
    keys: PropTypes.array,
    notes: PropTypes.array,
  },
  render() {
    return (
      h('div.zen-sequence-grid', [
        h('div.zen-sequence-grid__wrapper', [
          ...this.getRows(),
          this.props.notes.map((note, index) =>
            h(ZenSequenceNote, {
              key: index,
              octave: note.octave,
              note: note.note,
              time: note.time,
            })
          ),
        ]),
      ])
    );
  },
  getRows() {
    return this.props.keys.map(() =>
      h('div.zen-sequence-grid__row', _.range(40).map(() =>
        h('div.zen-sequence-grid__slot', [
          h('div.zen-sequence-grid__slot__fill'),
        ])
    )));
  }
});
