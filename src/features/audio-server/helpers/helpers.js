import isNumber from 'lodash/fp/isNumber';
import * as constants from './constants';
import Instrument from './instrument';

export function createChannel(track) {
  if (!track.id) {
    throw new Error('Tracks must have an id');
  }

  if (!track.synthType) {
    throw new Error('Tracks must have a synthType');
  }

  return {
    id: track.id,
    instrument: Instrument.create(track.id, track.synthType),
  };
}

export function getNoteName(y) {
  const octaveNumber = ((constants.octaveRange.length - 1) - Math.floor(y / 12));
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
