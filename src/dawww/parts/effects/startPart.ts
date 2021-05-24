import { DawwwEffects } from '../../types';

export const startPart: DawwwEffects = (
  getState,
  action,
  { helpers, models, toneAdapter },
) => {
  const { sequence } = action.payload;
  const { id, position } = sequence;
  const { parts } = getState();

  models.part.startAtTime(
    helpers.measuresToTime(position, toneAdapter),
    parts[id],
  );
};
