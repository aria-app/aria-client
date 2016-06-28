import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from 'ducks/shared';
import * as actionTypes from '../action-types';

const { setAtIds } = shared.helpers;

const dict = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SEQUENCE_ADDED:
      return setAtIds([action.sequence], state);
    case actionTypes.SEQUENCE_DELETED:
      return _.omit(state, action.sequence.id);
    case actionTypes.SEQUENCE_EXTENDED:
      return setAtIds([{
        ...action.sequence,
        measureCount: action.sequence.measureCount + 1,
      }], state);
    case actionTypes.SEQUENCE_NUDGED_LEFT:
      return setAtIds([{
        ...action.sequence,
        position: action.sequence.position === 0
          ? 0
          : action.sequence.position - 1,
      }], state);
    case actionTypes.SEQUENCE_NUDGED_RIGHT:
      return setAtIds([{
        ...action.sequence,
        position: action.sequence.position + 1,
      }], state);
    case actionTypes.SEQUENCE_SHORTENED:
      return setAtIds([{
        ...action.sequence,
        measureCount: action.sequence.measureCount === 1
          ? 1
          : action.sequence.measureCount - 1,
      }], state);
    case actionTypes.SEQUENCES_ADDED:
    case actionTypes.SEQUENCES_UPDATED:
      return setAtIds(action.sequences, state);
    case actionTypes.SEQUENCES_DELETED:
      return _.omit(state, _.map(action.sequences, 'id'));
    case actionTypes.SEQUENCES_SET:
      return setAtIds(action.sequences, state);
    case actionTypes.SONG_LOADED:
      return action.song.sequences.dict;
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SEQUENCE_ADDED:
      return state.concat(action.sequence.id);
    case actionTypes.SEQUENCE_DELETED:
      return _.without(state, action.sequence.id);
    case actionTypes.SEQUENCES_ADDED:
      return state.concat(_.map(action.sequences, 'id'));
    case actionTypes.SEQUENCES_DELETED:
      return _.difference(state, _.map(action.sequences, 'id'));
    case actionTypes.SEQUENCES_SET:
      return _.map(action.sequences, 'id');
    case actionTypes.SONG_LOADED:
      return action.song.sequences.ids;
    default:
      return state;
  }
};

export default combineReducers({
  dict,
  ids,
});
