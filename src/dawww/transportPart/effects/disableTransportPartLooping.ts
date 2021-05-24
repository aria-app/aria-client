import { DawwwEffects } from '../../types';

export const disableTransportPartLooping: DawwwEffects = (
  getState,
  action,
  { models },
) => {
  const { transportPart } = getState();

  models.part.disableLooping(transportPart);
};
