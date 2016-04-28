import { connect } from 'react-redux';
import { ZenSequence } from '../../components/zen-sequence/zen-sequence';
import {
  deleteNotes,
  setPosition,
  setSynth,
  setTool,
} from '../../redux/actions';

function mapStateToProps(state) {
  return {
    notes: state.notes,
    selectedNotes: state.selectedNotes,
    synth: state.synth,
    tool: state.tool,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestDeleteNotes: note => {
      dispatch(deleteNotes(note));
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
