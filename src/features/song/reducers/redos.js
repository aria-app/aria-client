import * as actions from '../actions';

export const redos = (state = [], action) => {
  switch (action.type) {
    case actions.REDOS_SET:
      return action.redos;
    case actions.SEQUENCE_CLOSED:
      return [];
    default:
      return state;
  }
};
