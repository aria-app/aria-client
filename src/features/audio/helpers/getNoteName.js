import shared from '../../shared';

export function getNoteName(y) {
  const octaveNumber = ((shared.constants.octaveRange.length - 1) - Math.floor(y / 12));
  const letter = getLetter(y);
  return `${letter}${octaveNumber}`;
}

function getLetter(point) {
  return [
    'B',
    'A#',
    'A',
    'G#',
    'G',
    'F#',
    'F',
    'E',
    'D#',
    'D',
    'C#',
    'C',
  ][point % 12];
}
