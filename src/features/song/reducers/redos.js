import { createReducer } from 'redux-create-reducer';
import sequenceData from '../../sequence-data';
import * as actions from '../actions';

export const redos = createReducer([], {
  [actions.REDOS_SET]: (state, action) =>
    action.redos,

  [sequenceData.actions.SEQUENCE_CLOSED]: () =>
    [],
});
