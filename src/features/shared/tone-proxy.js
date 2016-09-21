const mockTone = {
  Sequence: () => {},
  Gain: () => {},
  Transport: {
    pause: () => {},
    playbackState: '',
    start: () => {},
    stop: () => {},
  },
};

const Tone = typeof(AudioContext) !== 'undefined'
  ? require('tone')
  : mockTone;

export default Tone;
