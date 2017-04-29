import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export default createReducer(window.innerHeight, {
  [actions.WINDOW_HEIGHT_CHANGED]: (state, action) =>
    action.height,
});
