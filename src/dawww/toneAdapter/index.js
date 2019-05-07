/* eslint-disable no-param-reassign */
import getOr from 'lodash/fp/getOr';
import invokeArgs from 'lodash/fp/invokeArgs';
import isFunction from 'lodash/fp/isFunction';
import range from 'lodash/fp/range';
// eslint-disable-next-line lodash-fp/use-fp
import set from 'lodash/set';

export function createToneAdapter(Tone) {
  return {
    chainToMaster(source, ...rest) {
      invokeArgs('chain', [...rest, Tone.Master], source);
    },

    createInstrument(options) {
      const voice = getOr('sine', 'track.voice', options);
      const instrument = new Tone.PolySynth(5);

      invokeArgs(
        'set',
        [
          {
            oscillator: {
              type: voice.toLowerCase(),
            },
          },
        ],
        instrument,
      );

      return instrument;
    },

    createSequence(options) {
      const length = getOr(0, 'length', options);
      const Sequence = getOr(Object, 'Sequence', Tone);

      return new Sequence(
        this.onSequenceStep,
        range(0, length),
        Tone.Time('32n'),
      );
    },

    createVolume(options) {
      const volume = getOr(0, 'track.volume', options);
      const Volume = getOr(Object, 'Volume', Tone);

      return new Volume(volume);
    },

    onSequenceStep(time, step) {
      if (!isFunction(step.fn)) return;
      step.fn(step.payload, time);
    },

    pause() {
      invokeArgs('Transport.pause', [], Tone);
    },

    setBPM(value) {
      set(Tone, 'Transport.bpm.value', value);
    },

    setLoopPoints(...args) {
      invokeArgs('Transport.setLoopPoints', args, Tone);
      set(Tone, 'Transport.loop', true);
    },

    setTransportPosition(position) {
      set(Tone, 'Transport.position', position);
    },

    start(...args) {
      invokeArgs('Transport.start', args, Tone);
    },

    stop() {
      invokeArgs('Transport.pause', [], Tone);
    },

    Time(...args) {
      return invokeArgs('Time', args, Tone);
    },
  };
}
