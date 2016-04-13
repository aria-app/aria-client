import { connect } from 'react-redux';
import { addNote, removeNote, setSynth } from 'redux/actions';
import { ZenSequence } from 'components/zen-sequence/zen-sequence';

export const ZenSequenceContainer = connect(
  (state) => ({
    measureCount: state.measureCount,
    notes: state.notes,
    synth: state.synth,
  }),
  (dispatch) => ({
    requestAddNote: note => {
      dispatch(addNote(note));
    },
    requestRemoveNote: note => {
      dispatch(removeNote(note));
    },
    requestSetSynth: type => {
      dispatch(setSynth(type));
    },
  })
)(ZenSequence);
