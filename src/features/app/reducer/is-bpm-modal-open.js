import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export default createReducer(false, {
  [shared.actions.BPM_MODAL_CLOSED]: () =>
    false,

  [shared.actions.BPM_MODAL_OPENED]: () =>
    true,
});
