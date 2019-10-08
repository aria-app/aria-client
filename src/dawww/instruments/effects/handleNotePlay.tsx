import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';

export function handleNotePlay(getState, action, shared) {
  const { trackId, pitch, length, time } = action.payload;
  const getPitchName = getOr(noop, 'helpers.getPitchName', shared);
  const playNote = getOr(noop, 'models.instrument.playNote', shared);
  const instrument = getOr({}, `instruments[${trackId}]`, getState());
  const name = getPitchName(pitch);

  playNote(instrument, name, length, time);
}
