import { v4 } from 'node-uuid';
import shared from 'ducks/shared';
import * as helpers from './helpers';
import * as actionTypes from './action-types';

const { synthTypes } = shared.constants;

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
  const tracks = [
    helpers.createTrack(synthTypes.SQUARE),
    helpers.createTrack(synthTypes.SAWTOOTH),
    helpers.createTrack(synthTypes.PWM),
  ];

  const sequences = [
    helpers.createSequence({
      trackId: tracks[0].id,
      measureCount: 1,
      position: 0,
    }),
    helpers.createSequence({
      trackId: tracks[1].id,
      measureCount: 2,
      position: 0,
    }),
    helpers.createSequence({
      trackId: tracks[2].id,
      measureCount: 1,
      position: 0,
    }),
    helpers.createSequence({
      trackId: tracks[0].id,
      measureCount: 1,
      position: 1,
    }),
  ];

  return {
    activeSequenceId: undefined,
    song: {
      bpm: 120,
      id: v4(),
      measureCount: 2,
      name: 'My Song',
      sequences,
      tracks,
    },
  };
}
