import { Instrument, ToneTime } from '../../types';

type PlayNote = (
  instrument: Instrument,
  name: string,
  length?: ToneTime,
  time?: ToneTime,
) => void;

export const playNote: PlayNote = (instrument, name, length = '16n', time) => {
  instrument.triggerAttackRelease(name, length, time);
};
