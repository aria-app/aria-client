import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export default createReducer(window.innerWidth, {
  [actions.WINDOW_WIDTH_CHANGED]: (state, action) =>
    action.width,
});
