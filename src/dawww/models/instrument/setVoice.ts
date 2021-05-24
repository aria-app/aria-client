import { Instrument } from '../../types';

export function setVoice(instrument: Instrument, value: string): void {
  instrument.set({
    oscillator: {
      type: value,
    },
  });
}
