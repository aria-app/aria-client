import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export default createReducer(false, {
  [actions.BPM_MODAL_CLOSED]: () =>
    false,

  [actions.BPM_MODAL_OPENED]: () =>
    true,
});
