import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';

export function setToneLoopPoints(getState, action, shared) {
  const measuresToTime = getOr(noop, 'helpers.measuresToTime', shared);
  const getLoopEndPoint = getOr(noop, 'selectors.getLoopEndPoint', shared);
  const getLoopStartPoint = getOr(noop, 'selectors.getLoopStartPoint', shared);
  const setLoopPoints = getOr(noop, 'toneAdapter.setLoopPoints', shared);
  const loopEndPoint = getLoopEndPoint(getState());
  const loopEndTime = measuresToTime(loopEndPoint, shared.toneAdapter);
  const loopStartPoint = getLoopStartPoint(getState());
  const loopStartTime = measuresToTime(loopStartPoint, shared.toneAdapter);

  setLoopPoints(loopStartTime, loopEndTime);
}
