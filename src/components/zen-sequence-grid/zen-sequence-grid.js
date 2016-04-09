import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './zen-sequence-grid.scss';
import { ZenSequenceNote } from '../zen-sequence-note/zen-sequence-note';

export const ZenSequenceGrid = React.createClass({
  render() {
    const rows = _.range(88)
      .map(() => ({
        columns: _.range(40),
      }));
    const rowElements = rows.map(row =>
      h('div.zen-sequence-grid__row', row.columns.map(() =>
        h('div.zen-sequence-grid__slot', [
          h('div.zen-sequence-grid__slot__fill'),
        ])
    )));
    return (
      h('div.zen-sequence-grid', [
        h('div.zen-sequence-grid__wrapper', [
          ...rowElements,
          h(ZenSequenceNote, {
            top: 4,
            left: 2,
          }),
        ]),
      ])
    );
  },
});
