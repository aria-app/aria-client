import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export const didAuthenticationRun = createReducer(false, {
  [shared.actions.USER_SIGN_IN_SUCCEEDED]: (state, action) =>
    true,

  [shared.actions.USER_SIGN_OUT_SUCCEEDED]: (state, action) =>
    true,
});
