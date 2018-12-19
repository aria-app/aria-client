import Dawww from 'dawww';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export const songs = createReducer({}, {
  [shared.actions.USER_SONGS_FETCHED]: (state, action) =>
    Dawww.setAtIds(action.payload.songs, state),
});
