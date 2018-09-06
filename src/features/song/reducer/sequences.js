import Dawww from 'dawww';
import reject from 'lodash/fp/reject';
import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export const sequences = createReducer({}, {
  [shared.actions.SONG_LOADED]: (state, action) =>
    action.payload.song.sequences,

  [shared.actions.SEQUENCE_ADDED]: (state, action) =>
    Dawww.setAtIds([action.payload.sequence], state),

  [shared.actions.SEQUENCE_DELETED]: (state, action) =>
    omit(action.payload.sequence.id, state),

  [shared.actions.SEQUENCE_EXTENDED]: (state, action) =>
    Dawww.setAtIds([{
      ...action.payload.sequence,
      measureCount: action.payload.sequence.measureCount + 1,
    }], state),

  [shared.actions.SEQUENCE_NUDGED_LEFT]: (state, action) =>
    Dawww.setAtIds([{
      ...action.payload.sequence,
      position: action.payload.sequence.position - 1,
    }], state),

  [shared.actions.SEQUENCE_NUDGED_RIGHT]: (state, action) =>
    Dawww.setAtIds([{
      ...action.payload.sequence,
      position: action.payload.sequence.position + 1,
    }], state),

  [shared.actions.SEQUENCE_SHORTENED]: (state, action) =>
    Dawww.setAtIds([{
      ...action.payload.sequence,
      measureCount: action.payload.sequence.measureCount - 1,
    }], state),

  [shared.actions.TRACK_ADDED]: (state, action) =>
    Dawww.setAtIds([action.payload.sequence], state),

  [shared.actions.TRACK_DELETED]: (state, action) =>
    Dawww.setAtIds(reject(sequence => sequence.trackId === action.payload.track.id, state), {}),

  [shared.actions.TRACK_SEQUENCES_ORDER_CHANGED]: (state, action) =>
    Dawww.setAtIds([{
      ...action.payload.sequence,
      position: action.payload.position,
    }], state),
});
