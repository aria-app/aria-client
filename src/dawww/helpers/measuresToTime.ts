export function measuresToTime(measureCount: number, toneAdapter) {
  return Math.floor(measureCount * 32) * toneAdapter.Time('32n');
}
