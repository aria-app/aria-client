import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import sequenceData from '../../sequence-data';
import * as actions from '../actions';

export const activeSequenceId = createReducer('', {
  [actions.SEQUENCE_OPENED]: (state, action) =>
    action.id,

  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.activeSequenceId,

  [sequenceData.actions.SEQUENCE_CLOSED]: () =>
    '',
});
