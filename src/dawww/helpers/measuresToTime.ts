type MeasuresToTime = (measureCount: number, toneAdapter: any) => number;

export const measuresToTime: MeasuresToTime = (measureCount, toneAdapter) => {
  return Math.floor(measureCount * 32) * toneAdapter.Time('32n');
};
