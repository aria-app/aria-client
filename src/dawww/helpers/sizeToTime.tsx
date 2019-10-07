export function sizeToTime(size, toneAdapter) {
  return (size + 1) * toneAdapter.Time('32n');
}
