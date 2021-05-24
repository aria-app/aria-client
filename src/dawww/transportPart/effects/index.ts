import * as actions from '../../actions';
import { DawwwEffects } from '../../types';
import { disableTransportPartLooping } from './disableTransportPartLooping';
import { setToneLoopPoints } from './setToneLoopPoints';
import { setTransportPartEvents } from './setTransportPartEvents';
import { startTransportPart } from './startTransportPart';

export const transportPartEffects: DawwwEffects = (
  getState,
  action,
  shared,
) => {
  switch (action.type) {
    case actions.MEASURE_COUNT_EDITED:
      setTransportPartEvents(getState, action, shared);
      startTransportPart(getState, action, shared);
      disableTransportPartLooping(getState, action, shared);
      setToneLoopPoints(getState, action, shared);
      break;
    default:
  }
};
