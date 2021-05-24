import { DawwwEffects } from '../../types';

export const startTransportPart: DawwwEffects = (
  getState,
  action,
  { helpers, models, selectors, toneAdapter },
) => {
  const loopStartPoint = selectors.getLoopStartPoint(getState());
  const loopStartTime = helpers.measuresToTime(loopStartPoint, toneAdapter);
  const { transportPart } = getState();

  models.part.startAtOffset(loopStartTime, transportPart);
};
