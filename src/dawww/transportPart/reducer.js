import * as actions from '../actions';

export default function reducer(state = {}, action, shared) {
  switch (action.type) {
    case actions.MEASURE_COUNT_EDITED:
      return shared.toneAdapter.createSequence({
        length: action.payload.measureCount * 32,
      });
    default:
      return state;
  }
}
