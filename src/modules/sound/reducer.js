import sequence from 'modules/sequence';
import { playbackStates } from './constants';
import { createSynth } from './helpers';
import actionTypes from './actionTypes';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_BPM:
      return {
        ...state,
        bpm: action.bpm,
      };
    case actionTypes.SET_PLAYBACK_STATE:
      return {
        ...state,
        playbackState: action.playbackState,
      };
    case actionTypes.SET_POSITION:
      return {
        ...state,
        position: action.position,
      };
    case actionTypes.SET_SYNTH:
      return {
        ...state,
        synth: createSynth(action.synthType),
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    bpm: undefined,
    playbackState: playbackStates.STOPPED,
    position: 0,
    synth: createSynth(sequence.constants.defaultSynthType),
  };
}
