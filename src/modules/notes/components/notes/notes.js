import { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import sequence from 'modules/sequence';
import { Note } from '../note/note';
import './notes.scss';

const component = ({
  notes,
  onNotesPress,
  onPress,
  selectedNotes,
}) => h('.notes', {
  onClick: onNotesPress,
}, notes.map((note, index) =>
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
    drawNote: PropTypes.func,
    eraseNote: PropTypes.func,
    playNote: PropTypes.func,
    selectNotes: PropTypes.func,
    selectedNotes: PropTypes.array,
    toolType: PropTypes.string,
  }),
  withHandlers({
    onNotesPress: ({ drawNote, toolType }) => e => {
      if (toolType !== sequence.constants.toolTypes.DRAW) return;

      const mousePosition = getMousePosition(e);

      drawNote({
        octave: 6 - Math.floor(mousePosition.y / 12),
        pitch: 11 - mousePosition.y % 12,
        length: '32n',
        time: mousePosition.x,
      });
    },
    onPress: ({
      playNote,
      eraseNote,
      selectNotes,
      selectedNotes,
      toolType,
    }) => (note, isCtrlPressed) => {
      if (toolType === sequence.constants.toolTypes.ERASE) {
        eraseNote(note);
        return;
      }

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

function getMousePosition(e) {
  const offsetLeft = e.target.parentElement.parentElement.offsetLeft;
  const offsetTop = e.target.parentElement.parentElement.offsetTop;
  const scrollTop = e.target
    .parentElement
    .parentElement
    .parentElement
    .parentElement
    .scrollTop;
  const toSlotNumber = num => Math.floor(num / 40);
  return {
    x: toSlotNumber(e.pageX - offsetLeft),
    y: toSlotNumber(e.pageY - offsetTop + scrollTop),
  };
}
