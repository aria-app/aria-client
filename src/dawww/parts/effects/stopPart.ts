import { DawwwEffects } from '../../types';

export const stopPart: DawwwEffects = (getState, action, { models }) => {
  const { sequence } = action.payload;
  const { parts } = getState();

  models.part.stop(parts[sequence.id]);
};
