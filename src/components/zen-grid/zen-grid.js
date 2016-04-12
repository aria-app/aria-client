import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import './zen-grid.scss';
import { ZenNotes } from 'components/zen-notes/zen-notes';
import { ZenSlots } from 'components/zen-slots/zen-slots';

export const ZenGrid = React.createClass({
  propTypes: {
    notes: PropTypes.array,
    scale: PropTypes.array,
    onNotePress: PropTypes.func,
    onSlotPress: PropTypes.func,
  },
  render() {
    return (
      h('div.zen-grid', [
        h('div.zen-grid__wrapper', [
          h(ZenSlots, {
            scale: this.props.scale,
            onSlotPress: this.props.onSlotPress,
          }),
          h(ZenNotes, {
            notes: this.props.notes,
            onNotePress: this.props.onNotePress,
          }),
        ]),
      ])
    );
  },
});
