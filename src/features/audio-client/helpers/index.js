import isNumber from 'lodash/fp/isNumber';
import shared from '../../shared';

export function getNoteName(y) {
  const octaveNumber = ((shared.constants.octaveRange.length - 1) - Math.floor(y / 12));
  const letter = getLetter(y);
  return `${letter}${octaveNumber}`;
}

export function sizeToTime(size) {
  if (!isNumber(size)) {
    throw new Error('Size must be a number');
  }

  return `(${size + 1} * 32n)`;
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
