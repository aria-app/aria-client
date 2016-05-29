import shared from 'ducks/shared';
import * as actionTypes from './action-types';
import * as helpers from './helpers';

const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_SYNTHS:
      return {
        ...state,
        activeSynths: action.activeSynths,
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
    synths: helpers.createSynths(shared.constants.defaultSynthType),
    tracks: [
      {
        id: 0,
        activeSynths: [],
        synths: helpers.createSynths(shared.constants.synthTypes.SQUARE),
      },
      {
        id: 1,
        activeSynths: [],
        synths: helpers.createSynths(shared.constants.synthTypes.SAWTOOTH),
      },
      {
        id: 2,
        activeSynths: [],
        synths: helpers.createSynths(shared.constants.synthTypes.PWM),
      },
    ],
  };
}
