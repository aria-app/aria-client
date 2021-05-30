import { DawwwEffects } from '../../types';

export const setToneLoopPoints: DawwwEffects = (
  getState,
  action,
  { helpers, selectors, toneAdapter },
) => {
  const loopEndPoint = selectors.getLoopEndPoint(getState());
  const loopEndTime = helpers.measuresToTime(loopEndPoint, toneAdapter);
  const loopStartPoint = selectors.getLoopStartPoint(getState());
  const loopStartTime = helpers.measuresToTime(loopStartPoint, toneAdapter);
  toneAdapter.setLoopPoints(loopStartTime, loopEndTime);
};
