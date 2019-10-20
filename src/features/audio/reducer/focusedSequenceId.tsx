import { createReducer } from 'redux-starter-kit';
import shared from '../../shared';

export default createReducer<string, {}>('', {
  [shared.actions.ROUTE_NOTES_EDITOR_LOADED]: (state, action) =>
    action.payload.sequenceId,
  [shared.actions.ROUTE_SONG_EDITOR_LOADED]: () => '',
});
