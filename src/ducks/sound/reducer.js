import shared from 'ducks/shared';
import { playbackStates } from './constants';
import actionTypes from './action-types';
import * as helpers from './helpers';

const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_SYNTHS:
      return {
        ...state,
        activeSynths: action.activeSynths,
      };
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
    case actionTypes.SET_SYNTHS:
      return {
        ...state,
        synths: action.synths,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    activeSynths: [],
    bpm: undefined,
    playbackState: playbackStates.STOPPED,
    position: 0,
    synths: helpers.createSynths(shared.constants.defaultSynthType),
  };
}
