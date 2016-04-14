import { connect } from 'react-redux';
import { addNote, deleteNotes, selectNotes, setPosition, setSynth } from 'redux/actions';
import { ZenSequence } from 'components/zen-sequence/zen-sequence';

export const ZenSequenceContainer = connect(
  state => ({
    measureCount: state.measureCount,
    notes: state.notes,
    selectedNotes: state.selectedNotes,
    position: state.position,
    synth: state.synth,
  }),
  dispatch => ({
    requestAddNote: note => {
      dispatch(addNote(note));
    },
    requestDeleteNotes: notes => {
      dispatch(deleteNotes(notes));
    },
    requestSelectNotes: notes => {
      dispatch(selectNotes(notes));
    },
    requestSetPosition: position => {
      dispatch(setPosition(position));
    },
    requestSetSynth: type => {
      dispatch(setSynth(type));
    },
  })
)(ZenSequence);
