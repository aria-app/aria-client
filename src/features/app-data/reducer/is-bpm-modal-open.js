import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export default createReducer(false, {
  [actions.FILE_DRAG_CANCELLED]: () =>
    false,

  [actions.SONG_LOADED]: () =>
    false,

  [actions.FILE_DRAG_STARTED]: () =>
    true,
});
