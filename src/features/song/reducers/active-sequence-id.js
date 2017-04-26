import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import sequenceData from '../../sequence-data';
import tracksData from '../../tracks-data';

export const activeSequenceId = createReducer('', {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.activeSequenceId,

  [sequenceData.actions.SEQUENCE_CLOSED]: () =>
    '',

  [tracksData.actions.SEQUENCE_OPENED]: (state, action) =>
    action.payload,
});
