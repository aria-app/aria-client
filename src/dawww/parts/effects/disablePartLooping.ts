import { DawwwEffects } from '../../types';

export const disablePartLooping: DawwwEffects = (
  getState,
  action,
  { models },
) => {
  const { sequence } = action.payload;
  const { parts } = getState();

  models.part.disableLooping(parts[sequence.id]);
};
