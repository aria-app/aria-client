import getOr from 'lodash/fp/getOr';
import isEmpty from 'lodash/fp/isEmpty';
import noop from 'lodash/fp/noop';

export function handlePartStepTriggered(getState, action, shared) {
  const getNoteLength = getOr(noop, 'helpers.getNoteLength', shared);
  const getPitchName = getOr(noop, 'helpers.getPitchName', shared);
  const playNote = getOr(noop, 'models.instrument.playNote', shared);
  const time = getOr(0, 'payload.time', action);
  const trackId = getOr('', 'payload.trackId', action);
  const instrument = getOr({}, `instruments[${trackId}]`, getState());
  const noteIds = getOr([], 'payload.noteIds', action);

  noteIds.forEach(noteId => {
    const note = getOr({}, `song.notes[${noteId}]`, getState());

    if (isEmpty(note)) return;

    const pitch = getOr(-1, 'points[0].y', note);
    const name = getPitchName(pitch);
    const length = getNoteLength(note, shared.toneAdapter);

    playNote(instrument, name, length, time);
  });
}
