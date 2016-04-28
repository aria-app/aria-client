import { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import { ZenNote } from '../zen-note/zen-note';
import './zen-notes.scss';

const component = ({
  notes,
  onPress,
  selectedNotes,
}) => h('.zen-notes', notes.map((note, index) =>
  h(ZenNote, {
    key: index,
    isSelected: _.includes(selectedNotes, note),
    note,
    onPress,
  })
));

export const ZenNotes = compose([
  setPropTypes({
    notes: PropTypes.array,
    requestSelectNotes: PropTypes.func,
    selectedNotes: PropTypes.array,
  }),
  withHandlers({
    onPress: ({
      requestSelectNotes,
      selectedNotes,
    }) => (note, isCtrlPressed) => {
      if (!isCtrlPressed) requestSelectNotes([note]);

      if (_.includes(selectedNotes, note)) {
        requestSelectNotes(_.without(selectedNotes, note));
      } else {
        requestSelectNotes(selectedNotes.concat([note]));
      }
    },
  }),
  pure,
])(component);
