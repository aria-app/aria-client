import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';

export function disableTransportPartLooping(getState, action, shared) {
  const disableLooping = getOr(noop, 'models.part.disableLooping', shared);
  const transportPart = getOr({}, 'transportPart', getState());

  disableLooping(transportPart);
}
