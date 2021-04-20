import * as actions from '../actions';

export default function reducer(state = 0, action) {
  switch (action.type) {
    case actions.POSITION_SET:
      return action.payload.position;
    default:
      return state;
  }
}
