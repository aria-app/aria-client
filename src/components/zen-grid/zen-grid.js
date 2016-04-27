import { PropTypes } from 'react';
import h from 'react-hyperscript';
import { compose, pure, setPropTypes } from 'recompose';
import { ZenNotes } from '../zen-notes/zen-notes';
import { ZenPositionMarker } from '../zen-position-marker/zen-position-marker';
import { ZenSlots } from '../zen-slots/zen-slots';
import './zen-grid.scss';

const component = ({
  measureCount,
  onNotePress,
  onSlotPress,
  notes,
  position,
  scale,
  selectedNotes,
  synth,
}) => h('.zen-grid', [
  h('.zen-grid__wrapper', [
    h(ZenSlots, {
      measureCount,
      scale,
      synth,
      onSlotPress,
    }),
    h(ZenNotes, {
      notes,
      selectedNotes,
      onNotePress,
    }),
    h(ZenPositionMarker, {
      position,
    }),
  ]),
]);

export const ZenGrid = compose([
  setPropTypes({
    measureCount: PropTypes.number,
    notes: PropTypes.array,
    position: PropTypes.number,
    scale: PropTypes.array,
    selectedNotes: PropTypes.array,
    synth: PropTypes.object,
    onNotePress: PropTypes.func,
    onSlotPress: PropTypes.func,
  }),
  pure,
])(component);
