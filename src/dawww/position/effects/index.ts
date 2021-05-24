import * as actions from '../../actions';
import { DawwwEffects } from '../../types';
import { setPosition } from './setPosition';

export const positionEffects: DawwwEffects = (getState, action, shared) => {
  switch (action.type) {
    case actions.POSITION_SET_REQUESTED:
      setPosition(getState, action, shared);
      break;
    default:
  }
};
