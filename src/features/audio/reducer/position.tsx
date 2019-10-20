import { createReducer, PayloadAction } from 'redux-starter-kit';
import * as actions from '../actions';

export default createReducer<number, {}>(0, {
  [actions.positionRequestSucceeded.type]: (
    state,
    action: PayloadAction<number>,
  ) => action.payload,
});
