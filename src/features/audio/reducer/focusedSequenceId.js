import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export default createReducer('', {
  [shared.actions.SEQUENCE_EDITOR_LOADED]: (state, action) =>
    action.payload.sequenceId,

  [shared.actions.SONG_EDITOR_LOADED]: (state, action) =>
    '',
});
