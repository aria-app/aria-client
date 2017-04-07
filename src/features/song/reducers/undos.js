import { createReducer } from 'redux-create-reducer';
import sequenceData from '../../sequence-data';
import * as actions from '../actions';

export const undos = createReducer([], {
  [actions.UNDOS_SET]: (state, action) =>
    action.undos,

  [sequenceData.actions.SEQUENCE_CLOSED]: () =>
    [],
});
