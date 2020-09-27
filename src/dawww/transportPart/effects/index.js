import * as actions from '../../actions';
import { disableTransportPartLooping } from './disableTransportPartLooping';
import { setTransportPartEvents } from './setTransportPartEvents';
import { setToneLoopPoints } from './setToneLoopPoints';
import { startTransportPart } from './startTransportPart';

export default function effects(getState, action, shared) {
  switch (action.type) {
    case actions.MEASURE_COUNT_EDITED:
      setTransportPartEvents(getState, action, shared);
      startTransportPart(getState, action, shared);
      disableTransportPartLooping(getState, action, shared);
      setToneLoopPoints(getState, action, shared);
      break;
    default:
  }
}
