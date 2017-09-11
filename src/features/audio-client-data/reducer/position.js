import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export default createReducer(0, {
  [actions.POSITION_REQUEST_SUCCEEDED]: (state, action) =>
    action.position,
});
