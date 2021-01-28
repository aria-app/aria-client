import * as actions from '../../actions';
import { setPosition } from './setPosition';

export default function effects(getState, action, shared) {
  switch (action.type) {
    case actions.POSITION_SET_REQUESTED:
      setPosition(getState, action, shared);
      break;
    default:
  }
}
