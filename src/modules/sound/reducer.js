import _ from 'lodash';
import sequence from 'modules/sequence';
import { playbackStates } from './constants';
import { createSynth } from './helpers';
import actionTypes from './actionTypes';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_BPM:
      return _.assign({}, state, {
        bpm: action.bpm,
      });
    case actionTypes.SET_PLAYBACK_STATE:
      return _.assign({}, state, {
        playbackState: action.playbackState,
      });
    case actionTypes.SET_POSITION:
      return _.assign({}, state, {
        position: action.position,
      });
    case actionTypes.SET_SYNTH:
      return _.assign({}, state, {
        synth: createSynth(action.synthType),
      });
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
