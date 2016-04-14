import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './zen-grid.scss';
import { ZenNotes } from 'components/zen-notes/zen-notes';
import { ZenPositionMarker } from 'components/zen-position-marker/zen-position-marker';
import { ZenSlots } from 'components/zen-slots/zen-slots';

export const ZenGrid = React.createClass({
  propTypes: {
    measureCount: React.PropTypes.number,
    notes: React.PropTypes.array,
    position: React.PropTypes.number,
    scale: React.PropTypes.array,
    selectedNotes: React.PropTypes.array,
    synth: React.PropTypes.object,
    onNotePress: React.PropTypes.func,
    onSlotPress: React.PropTypes.func,
  },
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps, this.props);
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
            selectedNotes: this.props.selectedNotes,
            onNotePress: this.props.onNotePress,
          }),
          h(ZenPositionMarker, {
            position: this.props.position,
          }),
        ]),
      ])
    );
  },
});
