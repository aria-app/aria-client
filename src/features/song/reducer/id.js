import { createReducer } from 'redux-starter-kit';

import shared from '../../shared';
import * as actions from '../actions';

const initialState = '';

export default createReducer(initialState, {
  [actions.songLoaded.type]: (state, action) => action.payload.id,
  [shared.actions.routeDashboardLoaded.type]: () => initialState,
});
