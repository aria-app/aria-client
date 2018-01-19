import reject from 'lodash/fp/reject';
import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

const { setAtIds } = shared.helpers;

export const sequences = createReducer({}, {
  [shared.actions.SONG_LOADED]: (state, action) =>
    action.song.sequences,

  [shared.actions.SEQUENCE_ADDED]: (state, action) =>
    setAtIds([action.sequence], state),

  [shared.actions.SEQUENCE_DELETED]: (state, action) =>
    omit(action.sequence.id, state),

  [shared.actions.SEQUENCE_EXTENDED]: (state, action) =>
    setAtIds([{
      ...action.sequence,
      measureCount: action.sequence.measureCount + 1,
    }], state),

  [shared.actions.SEQUENCE_NUDGED_LEFT]: (state, action) =>
    setAtIds([{
      ...action.sequence,
      position: action.sequence.position - 1,
    }], state),

  [shared.actions.SEQUENCE_NUDGED_RIGHT]: (state, action) =>
    setAtIds([{
      ...action.sequence,
      position: action.sequence.position + 1,
    }], state),

  [shared.actions.SEQUENCE_SHORTENED]: (state, action) =>
    setAtIds([{
      ...action.sequence,
      measureCount: action.sequence.measureCount - 1,
    }], state),

  [shared.actions.TRACK_ADDED]: (state, action) =>
    setAtIds([action.sequence], state),

  [shared.actions.TRACK_DELETED]: (state, action) =>
    reject(sequence => sequence.trackId === action.track.id, state),
});
