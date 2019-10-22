export function sizeToTime(size: number, toneAdapter) {
  return (size + 1) * toneAdapter.Time('32n');
}
