import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';

export function startTransportPart(getState, action, shared) {
  const measuresToTime = getOr(noop, 'helpers.measuresToTime', shared);
  const startAtOffset = getOr(noop, 'models.part.startAtOffset', shared);
  const getLoopStartPoint = getOr(noop, 'selectors.getLoopStartPoint', shared);
  const loopStartPoint = getLoopStartPoint(getState());
  const loopStartTime = measuresToTime(loopStartPoint, shared.toneAdapter);
  const transportPart = getOr({}, 'transportPart', getState());

  startAtOffset(loopStartTime, transportPart);
}
