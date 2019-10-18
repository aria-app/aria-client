import { createReducer } from 'redux-starter-kit';
import shared from '../../shared';

export default createReducer(0, {
  [shared.actions.POSITION_REQUEST_SUCCEEDED]: (state, action) =>
    action.payload.position,
});
