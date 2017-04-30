import map from 'lodash/fp/map';
import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import shared from '../../shared';
import tracksData from '../../tracks-data';

const { setAtIds } = shared.helpers;

export const sequenceDict = createReducer({}, {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.song.sequences.dict,

  [tracksData.actions.SEQUENCE_ADDED]: (state, action) =>
    setAtIds([action.sequence], state),

  [tracksData.actions.SEQUENCE_DELETED]: (state, action) =>
    omit(action.sequence.id, state),

  [tracksData.actions.SEQUENCE_EXTENDED]: (state, action) =>
    setAtIds([{
      ...action.sequence,
      measureCount: action.sequence.measureCount + 1,
    }], state),

  [tracksData.actions.SEQUENCE_NUDGED_LEFT]: (state, action) =>
    setAtIds([{
      ...action.sequence,
      position: action.sequence.position - 1,
    }], state),

  [tracksData.actions.SEQUENCE_NUDGED_RIGHT]: (state, action) =>
    setAtIds([{
      ...action.sequence,
      position: action.sequence.position + 1,
    }], state),

  [tracksData.actions.SEQUENCE_SHORTENED]: (state, action) =>
    setAtIds([{
      ...action.sequence,
      measureCount: action.sequence.measureCount - 1,
    }], state),

  [tracksData.actions.TRACK_ADDED]: (state, action) =>
    setAtIds([action.sequence], state),

  [tracksData.actions.TRACK_DELETED]: (state, action) =>
    omit(map('id', action.sequences), state),
});
