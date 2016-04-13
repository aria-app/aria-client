import React from 'react';
import h from 'react-hyperscript';
import './zen-grid.scss';
import { ZenNotes } from 'components/zen-notes/zen-notes';
import { ZenSlots } from 'components/zen-slots/zen-slots';

export const ZenGrid = React.createClass({
  propTypes: {
    measureCount: React.PropTypes.number,
    notes: React.PropTypes.array,
    scale: React.PropTypes.array,
    synth: React.PropTypes.object,
    onNotePress: React.PropTypes.func,
    onSlotPress: React.PropTypes.func,
  },
  render() {
    return (
      h('.zen-grid', [
        h('.zen-grid__wrapper', [
          h(ZenSlots, {
            measureCount: this.props.measureCount,
            scale: this.props.scale,
            synth: this.props.synth,
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
