import { omit } from 'lodash/fp';
import shared from '../../shared';
import * as actions from '../actions';

const { setAtIds } = shared.helpers;

export const sequenceDict = (state = {}, action) => {
  switch (action.type) {
    case actions.SEQUENCES_ADDED:
    case actions.SEQUENCES_UPDATED:
      return setAtIds(action.sequences, state);
    case actions.SEQUENCES_DELETED:
      return omit(action.ids)(state);
    case actions.SEQUENCE_EXTENDED:
      return setAtIds([{
        ...state[action.id],
        measureCount: state[action.id].measureCount + 1,
      }], state);
    case actions.SEQUENCE_NUDGED_LEFT:
      return setAtIds([{
        ...state[action.id],
        position: state[action.id].position === 0
          ? 0
          : state[action.id].position - 1,
      }], state);
    case actions.SEQUENCE_NUDGED_RIGHT:
      return setAtIds([{
        ...state[action.id],
        position: state[action.id].position + 1,
      }], state);
    case actions.SEQUENCE_SHORTENED:
      return setAtIds([{
        ...state[action.id],
        measureCount: state[action.id].measureCount === 1
          ? 1
          : state[action.id].measureCount - 1,
      }], state);
    case actions.SEQUENCES_SET:
      return setAtIds(action.sequences, state);
    case actions.SONG_LOADED:
      return action.song.sequences.dict;
    default:
      return state;
  }
};
