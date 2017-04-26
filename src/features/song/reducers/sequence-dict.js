import { omit } from 'lodash/fp';
import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import shared from '../../shared';
import * as actions from '../actions';

const { setAtIds } = shared.helpers;

export const sequenceDict = createReducer({}, {
  [actions.SEQUENCES_ADDED]: (state, action) =>
    setAtIds(action.sequences, state),

  [actions.SEQUENCES_UPDATED]: (state, action) =>
    setAtIds(action.sequences, state),

  [actions.SEQUENCES_DELETED]: (state, action) =>
    omit(action.ids)(state),

  [actions.SEQUENCE_EXTENDED]: (state, action) =>
    setAtIds([{
      ...state[action.id],
      measureCount: state[action.id].measureCount + 1,
    }], state),

  [actions.SEQUENCE_NUDGED_LEFT]: (state, action) =>
    setAtIds([{
      ...state[action.id],
      position: state[action.id].position === 0
        ? 0
        : state[action.id].position - 1,
    }], state),

  [actions.SEQUENCE_NUDGED_RIGHT]: (state, action) =>
    setAtIds([{
      ...state[action.id],
      position: state[action.id].position + 1,
    }], state),

  [actions.SEQUENCE_SHORTENED]: (state, action) =>
    setAtIds([{
      ...state[action.id],
      measureCount: state[action.id].measureCount === 1
        ? 1
        : state[action.id].measureCount - 1,
    }], state),

  [actions.SEQUENCES_SET]: (state, action) =>
    setAtIds(action.sequences, state),

  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.sequences.dict,
});
