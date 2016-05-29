export function sizeToSeconds(size, bpm) {
  return ((60 / bpm) / 8) * (size + 1);
}
