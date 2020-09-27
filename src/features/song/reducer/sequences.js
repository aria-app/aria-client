import omit from 'lodash/fp/omit';
import reject from 'lodash/fp/reject';
import { createReducer } from 'redux-starter-kit';

import shared from '../../shared';
import * as actions from '../actions';

const initialState = {};

export default createReducer(initialState, {
  [actions.songLoaded.type]: (state, action) => action.payload.sequences,
  [actions.sequenceAdded.type]: (state, action) =>
    shared.helpers.setAtIds([action.payload], state),
  [actions.sequenceDeleted.type]: (state, action) =>
    omit(action.payload.id, state),
  [actions.sequenceDuplicated.type]: (state, action) =>
    shared.helpers.setAtIds([action.payload.duplicatedSequence], state),
  [actions.sequenceEdited.type]: (state, action) =>
    shared.helpers.setAtIds([action.payload], state),
  [actions.trackAdded.type]: (state, action) =>
    shared.helpers.setAtIds([action.payload.sequence], state),
  [actions.trackDeleted.type]: (state, action) =>
    shared.helpers.setAtIds(
      reject((sequence) => sequence.trackId === action.payload.id, state),
      {},
    ),
  [shared.actions.routeDashboardLoaded.type]: () => initialState,
});
