import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export default createReducer('', {
  [shared.actions.SEQUENCE_FOCUSED]: (state, action) =>
    action.payload.sequence.id,

  [shared.actions.SONG_FOCUSED]: (state, action) =>
    '',
});
