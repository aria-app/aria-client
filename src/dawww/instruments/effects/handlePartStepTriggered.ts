import { DawwwEffects } from '../../types';

export const handlePartStepTriggered: DawwwEffects = (
  getState,
  action,
  { helpers, models, toneAdapter },
) => {
  const { noteIds, time, trackId } = action.payload;
  const { instruments } = getState();

  noteIds.forEach((noteId) => {
    const { song } = getState();
    const note = song.notes[noteId];

    if (!note) return;

    const pitch = note.points?.[0].y;
    const name = helpers.getPitchName(pitch);
    const length = helpers.getNoteLength(note, toneAdapter);

    models.instrument.playNote(instruments[trackId], name, length, time);
  });
};
