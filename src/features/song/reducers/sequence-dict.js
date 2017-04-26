import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import shared from '../../shared';
import tracksData from '../../tracks-data';
import * as helpers from '../helpers';

const { setAtIds } = shared.helpers;

export const sequenceDict = createReducer({}, {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.sequences.dict,

  [tracksData.actions.SEQUENCE_ADDED]: (state, action) =>
    setAtIds([helpers.createSequence({
      id: action.sequenceId,
      measureCount: 1,
      position: action.position,
      trackId: action.trackId,
    })], state),

  [tracksData.actions.SEQUENCE_EXTENDED]: (state, action) =>
    setAtIds([{
      ...state[action.id],
      measureCount: state[action.id].measureCount + 1,
    }], state),

  [tracksData.actions.SEQUENCE_NUDGED_LEFT]: (state, action) =>
    setAtIds([{
      ...state[action.id],
      position: state[action.id].position === 0
        ? 0
        : state[action.id].position - 1,
    }], state),

  [tracksData.actions.SEQUENCE_NUDGED_RIGHT]: (state, action) =>
    setAtIds([{
      ...state[action.id],
      position: state[action.id].position + 1,
    }], state),

  [tracksData.actions.SEQUENCE_SHORTENED]: (state, action) =>
    setAtIds([{
      ...state[action.id],
      measureCount: state[action.id].measureCount - 1,
    }], state),

  [tracksData.actions.TRACK_ADDED]: (state, action) =>
    setAtIds([helpers.createSequence({
      id: action.sequenceId,
      measureCount: 1,
      position: 0,
      trackId: action.trackId,
    })], state),

  [tracksData.actions.TRACK_DELETED]: (state, action) =>
    omit(action.sequenceIds, state),
});
