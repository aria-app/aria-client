/* eslint-disable no-param-reassign */
import isFunction from 'lodash/fp/isFunction';
import range from 'lodash/fp/range';
import * as Tone from 'tone';

import { ToneAdapter } from '../types';

export function createToneAdapter(providedTone: typeof Tone): ToneAdapter {
  return {
    chainToMaster(source, ...rest) {
      source.chain(...rest, providedTone.Destination);
    },

    createInstrument({ track }) {
      const instrument = new providedTone.PolySynth();

      instrument.set({
        oscillator: {
          type: track.voice.toLowerCase(),
        },
      });

      return instrument;
    },

    createSequence({ length = 0 }) {
      const part = new providedTone.Part(
        this.onSequenceStep,
        range(0, length).map((n) => ({ fn: () => {}, payload: {} })),
      );

      part.set({
        playbackRate: 32,
      });

      return part;
    },

    createVolume({ track }) {
      return new providedTone.Volume(track.volume);
    },

    onSequenceStep(time, step) {
      if (!isFunction(step.fn)) return;
      step.fn(step.payload, time);
    },

    pause() {
      providedTone.Transport.pause();
    },

    setBPM(value) {
      providedTone.Transport.bpm.value = value;
    },

    setLoopPoints(startPosition, endPosition) {
      providedTone.Transport.setLoopPoints(startPosition, endPosition);
      providedTone.Transport.loop = true;
    },

    setTransportPosition(position) {
      providedTone.Transport.position = position;
    },

    start(time, offset) {
      providedTone.Transport.start(time, offset);
    },

    stop() {
      providedTone.Transport.pause();
    },

    Time(value, units) {
      return providedTone.Time(value, units);
    },
  };
}
