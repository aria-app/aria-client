import { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import { Note } from '../note/note';
import './notes.scss';

const component = ({
  notes,
  onPress,
  selectedNotes,
}) => h('.notes', notes.map((note, index) =>
  h(Note, {
    key: index,
    isSelected: _.includes(selectedNotes, note),
    note,
    onPress,
  })
));

const composed = compose([
  setPropTypes({
    notes: PropTypes.array,
    playNote: PropTypes.func,
    selectNotes: PropTypes.func,
    selectedNotes: PropTypes.array,
  }),
  withHandlers({
    onPress: ({
      playNote,
      selectNotes,
      selectedNotes,
    }) => (note, isCtrlPressed) => {
      playNote(note.frequency);
      if (!isCtrlPressed) {
        selectNotes([note]);
        return;
      }

      if (_.includes(selectedNotes, note)) {
        selectNotes(_.without(selectedNotes, note));
      } else {
        selectNotes(selectedNotes.concat([note]));
      }
    },
  }),
  pure,
])(component);

export const Notes = composed;
