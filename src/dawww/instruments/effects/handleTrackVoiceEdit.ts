import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';

export function handleTrackVoiceEdit(getState, action, shared) {
  const setVoice = getOr(noop, 'models.instrument.setVoice', shared);
  const id = getOr('', 'payload.id', action);
  const instrument = getOr({}, `instruments[${id}]`, getState());
  const voice = getOr(0, 'payload.value', action);

  setVoice(instrument, voice);
}
