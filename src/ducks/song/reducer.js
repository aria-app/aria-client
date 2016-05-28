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
  const sequence1 = getSequence1();
  const sequence2 = getSequence2();
  return {
    activeSequenceId: 0,
    id: 0,
    sequences: [
      sequence1,
      sequence2,
    ],
    tracks: [{
      id: 0,
      synthType: shared.constants.synthTypes.SQUARE,
    }],
  };
}

function getSequence1() {
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

function getSequence2() {
  return {
    id: 1,
    trackId: 0,
    notes: [
      shared.helpers.createNote({
        points: [
          {
            x: 0,
            y: 32,
          },
          {
            x: 3,
            y: 32,
          },
        ],
      }),
    ],
  };
}
