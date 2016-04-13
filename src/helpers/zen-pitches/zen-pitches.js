export const pitches = {
  B: 11,
  BFLAT: 10,
  A: 9,
  GSHARP: 8,
  G: 7,
  FSHARP: 6,
  F: 5,
  E: 4,
  EFLAT: 3,
  D: 2,
  CSHARP: 1,
  C: 0,
};

export function getLetter(pitch) {
  return [
    'c',
    'csharp',
    'd',
    'eflat',
    'e',
    'f',
    'fsharp',
    'g',
    'gsharp',
    'a',
    'bflat',
    'b',
  ][pitch];
}
