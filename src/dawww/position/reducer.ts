import * as actions from '../actions';
import { DawwwReducer, State } from '../types';

export const positionReducer: DawwwReducer<State['position']> = (
  state,
  action,
) => {
  switch (action.type) {
    case actions.POSITION_SET:
      return action.payload.position;
    default:
      return state;
  }
};
