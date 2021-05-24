import { DawwwEffects } from '../../types';

export const disposePart: DawwwEffects = (getState, action, { models }) => {
  const { sequence } = action.payload;
  const { parts } = getState();

  models.part.dispose(parts[sequence.id]);
};
