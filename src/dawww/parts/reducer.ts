import omit from 'lodash/fp/omit';

import * as actions from '../actions';
import { DawwwReducer, State } from '../types';

export const partsReducer: DawwwReducer<State['parts']> = (
  state,
  action,
  shared,
) => {
  switch (action.type) {
    case actions.SEQUENCE_ADDED:
      return {
        ...state,
        [action.payload.sequence.id]: shared.toneAdapter.createSequence({
          length: action.payload.sequence.measureCount * 32,
        }),
      };
    case actions.SEQUENCE_DELETION_ACCEPTED:
      // This corresponding part needs to be disposed before the reference is lost.
      return omit([action.payload.sequence.id], state);
    default:
      return state;
  }
};
