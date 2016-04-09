import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './zen-sequence.scss';

export const ZenSequence = React.createClass({
  render() {
    const rows = _.range(72)
      .map(() => ({
        columns: _.range(72),
      }));
    const rowElements = rows.map(row =>
      h('div.zen-sequence__row', row.columns.map(() =>
        h('div.zen-sequence__step', [
          h('div.zen-sequence__step__fill'),
        ])
    )));
    return (
      h('div.zen-sequence', [
        ...rowElements,
        h('div.zen-sequence__edge', {
          style: {
            top: 80,
            left: 80,
          },
        }, [
          h('div.zen-sequence__edge__fill'),
        ]),
        h('div.zen-sequence__note', {
          style: {
            top: 80,
            left: 80,
          },
        }, [
          h('div.zen-sequence__note__fill'),
        ]),
        h('div.zen-sequence__note', {
          style: {
            top: 80,
            left: 160,
          },
        }, [
          h('div.zen-sequence__note__fill'),
        ]),
      ])
    );
  },
});
