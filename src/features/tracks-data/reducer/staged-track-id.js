import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export default createReducer('', {
  [actions.TRACK_EDITING_FINISHED]: () =>
    '',

  [actions.TRACK_EDITING_STARTED]: (state, action) =>
    action.track.id,
});
