import { connect } from 'react-redux';
import { ZenSequence } from '../../components/zen-sequence/zen-sequence';
import {
  deleteNotes,
  drawNote,
  selectNotes,
  setPosition,
  setSynth,
  setTool,
} from '../../redux/actions';

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
    requestDeleteNotes: notes => {
      dispatch(deleteNotes(notes));
    },
    requestDrawNote: note => {
      dispatch(drawNote(note));
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
