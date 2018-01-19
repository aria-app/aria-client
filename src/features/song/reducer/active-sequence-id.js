import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export const activeSequenceId = createReducer('', {
  [shared.actions.SONG_LOADED]: (state, action) =>
    action.song.activeSequenceId,

  [shared.actions.SEQUENCE_CLOSED]: () =>
    '',

  [shared.actions.SEQUENCE_OPENED]: (state, action) =>
    action.sequence.id,
});
