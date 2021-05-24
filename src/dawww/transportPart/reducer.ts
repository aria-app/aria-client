import * as actions from '../actions';
import { DawwwReducer, State } from '../types';

export const transportPartReducer: DawwwReducer<State['transportPart']> = (
  state,
  action,
  shared,
) => {
  switch (action.type) {
    case actions.MEASURE_COUNT_EDITED:
      return shared.toneAdapter.createSequence({
        length: action.payload.measureCount * 32,
      });
    default:
      return state;
  }
};
