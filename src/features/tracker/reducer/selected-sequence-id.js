import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export default createReducer('', {
  [shared.actions.SEQUENCE_DELETED]: () =>
    '',

  [shared.actions.SEQUENCE_DESELECTED]: () =>
    '',

  [shared.actions.SEQUENCE_OPENED]: () =>
    '',

  [shared.actions.SEQUENCE_SELECTED]: (state, action) =>
    action.sequence.id,
});
