import notes from 'ducks/notes';
import shared from 'ducks/shared';
import * as actionTypes from './action-types';

const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
  const song = getSong();
  return {
    activeSequence: song.tracks[0].sequences[0],
    song,
  };
}

function getSong() {
  return {
    id: 0,
    tracks: [{
      id: 0,
      sequences: [{
        id: 0,
        notes: [
          notes.helpers.createNote({
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
        synthType: shared.constants.synthTypes.SQUARE,
      }],
    }],
  };
}
