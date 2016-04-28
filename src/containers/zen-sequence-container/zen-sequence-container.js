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

function mapStateToProps(state) {
  return {
    measureCount: state.measureCount,
    notes: state.notes,
    selectedNotes: state.selectedNotes,
    position: state.position,
    synth: state.synth,
    tool: state.tool,
  };
}

function mapDispatchToProps(dispatch) {
  return {
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
  };
}

export const ZenSequenceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ZenSequence);
