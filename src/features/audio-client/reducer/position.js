import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export default createReducer(0, {
  [shared.actions.POSITION_REQUEST_SUCCEEDED]: (state, action) =>
    action.position,
});
