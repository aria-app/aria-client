import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import sequenceData from '../../sequence-data';
import shared from '../../shared';

export const activeSequenceId = createReducer('', {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.song.activeSequenceId,

  [sequenceData.actions.SEQUENCE_CLOSED]: () =>
    '',

  [shared.actions.SEQUENCE_OPENED]: (state, action) =>
    action.sequence.id,
});
