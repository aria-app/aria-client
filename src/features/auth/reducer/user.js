import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export default createReducer(null, {
  [shared.actions.USER_SIGN_IN_SUCCEEDED]: (state, action) =>
    action.payload.user,

  [shared.actions.USER_SIGN_OUT_SUCCEEDED]: (state, action) =>
    null,
});
