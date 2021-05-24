import { DawwwEffects } from '../../types';

export const handleTrackVoiceEdit: DawwwEffects = (
  getState,
  action,
  { models },
) => {
  const { id, value } = action.payload;
  const { instruments } = getState();

  models.instrument.setVoice(instruments[id], value);
};
