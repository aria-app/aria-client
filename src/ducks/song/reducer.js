import shared from 'ducks/shared';
import * as actionTypes from './action-types';

const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_SEQUENCE_ID:
      return {
        ...state,
        activeSequenceId: action.activeSequenceId,
      };
    case actionTypes.SET_SONG:
      return {
        ...state,
        song: action.song,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    activeSequenceId: undefined,
    song: {
      id: 0,
      sequences: [
        {
          id: 0,
          measureCount: 1,
          notes: [],
          position: 1,
          trackId: 0,
        },
        {
          id: 1,
          measureCount: 2,
          notes: [],
          position: 0,
          trackId: 1,
        },
        {
          id: 2,
          measureCount: 1,
          notes: [],
          position: 0,
          trackId: 2,
        },
      ],
      tracks: [
        {
          id: 0,
          synthType: shared.constants.synthTypes.SQUARE,
        },
        {
          id: 1,
          synthType: shared.constants.synthTypes.SAWTOOTH,
        },
        {
          id: 2,
          synthType: shared.constants.synthTypes.PWM,
        },
      ],
    },
  };
}
