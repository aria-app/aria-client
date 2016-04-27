import { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, setPropTypes, shouldUpdate } from 'recompose';
import { ZenNote } from '../zen-note/zen-note';
import './zen-notes.scss';

const component = ({
  notes,
  onNotePress,
  selectedNotes,
}) => h('.zen-notes', notes.map((note, index) =>
  h(ZenNote, {
    key: index,
    isSelected: _.includes(selectedNotes, note),
    note,
    onPress: onNotePress,
  })
));

export const ZenNotes = compose([
  setPropTypes({
    notes: PropTypes.array,
    selectedNotes: PropTypes.array,
    onNotePress: PropTypes.func,
  }),
  shouldUpdate((props, nextProps) =>
    !_.isEqual(nextProps.notes, props.notes)
      || !_.isEqual(nextProps.selectedNotes, props.selectedNotes)
  ),
])(component);
