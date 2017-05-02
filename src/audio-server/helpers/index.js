import compose from 'lodash/fp/compose';
import first from 'lodash/fp/first';
import getOr from 'lodash/fp/getOr';
import last from 'lodash/fp/last';
import * as constants from '../constants';
import Instrument from '../Instrument';

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

export function getNoteLength(note) {
  const start = compose(
    getOr(0, 'x'),
    first,
    getOr([], 'points'),
  )(note);
  const end = compose(
    getOr(start + 1, 'x'),
    last,
    getOr([], 'points'),
  )(note);

  return sizeToTime(end - start);
}

export function getNoteName(note) {
  const y = getOr(0, 'points[0].y', note);
  const octaveNumber = ((constants.octaveRange.length - 1) - Math.floor(y / 12));
  const letter = getLetter(y);
  return `${letter}${octaveNumber}`;
}

export function measuresToTime(measures) {
  return `(${measures * 32} * 32n)`;
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

function sizeToTime(size) {
  return `(${size + 1} * 32n)`;
}
