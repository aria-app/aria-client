import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export default createReducer(false, {
  [shared.actions.FILE_DRAG_CANCELLED]: () =>
    false,

  [shared.actions.FILE_DRAG_STARTED]: () =>
    true,

  [shared.actions.SONG_LOADED]: () =>
    false,
});
