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
    case actionTypes.SET_ID:
      return {
        ...state,
        id: action.id,
      };
    case actionTypes.SET_SEQUENCES:
      return {
        ...state,
        sequences: action.sequences,
      };
    case actionTypes.SET_TRACKS:
      return {
        ...state,
        tracks: action.tracks,
      };
    default:
      return state;
  }
}

function getInitialState() {
  const sequence = getSequence();
  return {
    activeSequenceId: 0,
    id: 0,
    sequences: [
      sequence,
    ],
    tracks: [{
      id: 0,
      synthType: shared.constants.synthTypes.SQUARE,
    }],
  };
}

function getSequence() {
  return {
    id: 0,
    trackId: 0,
    notes: [
      shared.helpers.createNote({
        points: [
          {
            x: 0,
            y: 40,
          },
          {
            x: 7,
            y: 40,
          },
        ],
      }),
    ],
  };
}
