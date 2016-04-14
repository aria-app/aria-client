import { connect } from 'react-redux';
import { ZenSequence } from 'components/zen-sequence/zen-sequence';
import {
  addNote,
  deleteNotes,
  selectNotes,
  setPosition,
  setSynth,
  setTool,
} from 'redux/actions';

export const ZenSequenceContainer = connect(
  state => ({
    measureCount: state.measureCount,
    notes: state.notes,
    selectedNotes: state.selectedNotes,
    position: state.position,
    synth: state.synth,
    tool: state.tool,
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
    requestSetTool: tool => {
      dispatch(setTool(tool));
    },
  })
)(ZenSequence);
