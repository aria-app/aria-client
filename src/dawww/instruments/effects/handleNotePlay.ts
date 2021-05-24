import { DawwwEffects } from '../../types';

export const handleNotePlay: DawwwEffects = (
  getState,
  action,
  { helpers, models },
) => {
  const { trackId, pitch, length, time } = action.payload;
  const { instruments } = getState();
  const name = helpers.getPitchName(pitch);

  models.instrument.playNote(instruments[trackId], name, length, time);
};
