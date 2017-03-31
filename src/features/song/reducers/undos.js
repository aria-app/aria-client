import * as actions from '../actions';

export const undos = (state = [], action) => {
  switch (action.type) {
    case actions.UNDOS_SET:
      return action.undos;
    case actions.SEQUENCE_CLOSED:
      return [];
    default:
      return state;
  }
};
