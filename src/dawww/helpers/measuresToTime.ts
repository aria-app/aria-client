import { ToneAdapter } from '../types';

type MeasuresToTime = (
  measureCount: number,
  toneAdapter: ToneAdapter,
) => number;

export const measuresToTime: MeasuresToTime = (measureCount, toneAdapter) => {
  return Math.floor(measureCount * 32) * toneAdapter.Time('32n').toSeconds();
};
