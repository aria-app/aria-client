import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './zen-sequence-grid.scss';
import { ZenSequenceNote } from '../zen-sequence-note/zen-sequence-note';

export const ZenSequenceGrid = React.createClass({
  propTypes: {
    notes: PropTypes.array,
  },
  render() {
    return (
      h('div.zen-sequence-grid', [
        h('div.zen-sequence-grid__wrapper', [
          ...getRows(),
          this.props.notes.map((note, index) =>
            h(ZenSequenceNote, {
              key: index,
              top: note.top,
              left: note.left,
            })
          ),
        ]),
      ])
    );
  },
});

function getRows() {
  return _.range(88).map(() =>
    h('div.zen-sequence-grid__row', _.range(40).map(() =>
      h('div.zen-sequence-grid__slot', [
        h('div.zen-sequence-grid__slot__fill'),
      ])
  )));
}
