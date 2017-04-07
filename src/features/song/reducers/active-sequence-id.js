import { createReducer } from 'redux-create-reducer';
import sequenceData from '../../sequence-data';
import * as actions from '../actions';

export const activeSequenceId = createReducer('', {
  [actions.SEQUENCE_OPENED]: (state, action) =>
    action.id,

  [actions.SONG_LOADED]: (state, action) =>
    action.song.activeSequenceId,

  [sequenceData.actions.SEQUENCE_CLOSED]: () =>
    '',
});
