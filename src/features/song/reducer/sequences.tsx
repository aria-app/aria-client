import omit from 'lodash/fp/omit';
import reject from 'lodash/fp/reject';
import { createReducer, PayloadAction } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import shared from '../../shared';
import { Sequence, Song, Track } from '../../shared/types';
import * as actions from '../actions';

const initialState = {};

export default createReducer<{ [key: string]: Sequence }, {}>(initialState, {
  [actions.songLoaded.type]: (state, action: PayloadAction<Song>) =>
    action.payload.sequences,
  [actions.sequenceAdded.type]: (state, action: PayloadAction<Sequence>) =>
    Dawww.setAtIds([action.payload], state),
  [actions.sequenceDeleted.type]: (state, action: PayloadAction<Sequence>) =>
    omit(action.payload.id, state),
  [actions.sequenceDuplicated.type]: (
    state,
    action: PayloadAction<{
      duplicatedSequence: Sequence;
      originalSequence: Sequence;
    }>,
  ) => Dawww.setAtIds([action.payload.duplicatedSequence], state),
  [actions.sequenceEdited.type]: (state, action: PayloadAction<Sequence>) =>
    Dawww.setAtIds([action.payload], state),
  [actions.trackAdded.type]: (
    state,
    action: PayloadAction<{
      sequence: Sequence;
      track: Track;
    }>,
  ) => Dawww.setAtIds([action.payload.sequence], state),
  [actions.trackDeleted.type]: (state, action: PayloadAction<Track>) =>
    Dawww.setAtIds(
      reject(sequence => sequence.trackId === action.payload.id, state),
      {},
    ),
  [shared.actions.ROUTE_DASHBOARD_LOADED]: () => initialState,
});
