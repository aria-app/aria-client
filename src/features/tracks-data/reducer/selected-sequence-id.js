import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export default createReducer('', {
  [actions.SEQUENCE_DELETED]: () =>
    '',

  [actions.SEQUENCE_DESELECTED]: () =>
    '',

  [actions.SEQUENCE_OPENED]: () =>
    '',

  [actions.SEQUENCE_SELECTED]: (state, action) =>
    action.id,
});
