import sound from 'modules/sound';

export function createNote(options) {
  return {
    ...options,
    frequency: sound.helpers.getFrequency(options.pitch, options.octave),
    letter: sound.helpers.getLetter(options.pitch),
  };
}
