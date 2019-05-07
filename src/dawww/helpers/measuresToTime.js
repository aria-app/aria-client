export function measuresToTime(measures, toneAdapter) {
  return Math.floor(measures * 32) * toneAdapter.Time('32n');
}
