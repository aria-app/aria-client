import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export default createReducer(false, {
  [actions.FILE_DRAG_CANCELLED]: () =>
    false,

  [actions.FILE_DRAG_STARTED]: () =>
    true,

  [actions.SONG_LOADED]: () =>
    false,
});
