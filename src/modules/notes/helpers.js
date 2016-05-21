import _ from 'lodash';
import * as constants from './constants';

export function addPositions(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

export function createNote({
  endPosition,
  id = _.uniqueId('note'),
  position,
}) {
  const safeEndPosition = endPosition
    || { x: position.x + 1, y: position.y };

  return {
    name: getNoteName(position.y),
    endName: getNoteName(safeEndPosition.y),
    endPosition: safeEndPosition,
    id,
    position,
  };
}

export function getNoteName(yPosition) {
  const octaveNumber = ((constants.octaveRange.length - 1) - Math.floor(yPosition / 12));
  const letter = getLetter(yPosition);
  return `${letter}${octaveNumber}`;
}

export function getScale() {
  return _(constants.octaveRange)
    .flatMap(octave => _.range(12).map(step => {
      const yPosition = (octave * 12) + step;
      return {
        name: getNoteName(yPosition),
        yPosition,
      };
    }))
    .value();
}

export function getType(synth) {
  return synth.voices[0].oscillator.type;
}

export function sizeToSeconds(size, bpm) {
  return ((60 / bpm) / 8) * size;
}

export function somePointWillMoveOutside(notes, offset, measureCount) {
  const totalSlotsX = measureCount * 8 * 4 - 1;
  const totalSlotsY = constants.octaveRange.length * 12 - 1;

  if (offset.x === -1) {
    return _.some(notes, isAtLeft);
  } else if (offset.x === 1) {
    return _.some(notes, isAtRight(totalSlotsX));
  } else if (offset.y === -1) {
    return _.some(notes, isAtTop);
  } else if (offset.y === 1) {
    return _.some(notes, isAtBottom(totalSlotsY));
  }

  return false;
}

function getLetter(position) {
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
  ][position % 12];
}

function isAtBottom(totalSlotsY) {
  return (note) => note.position.y >= totalSlotsY
    || note.endPosition.y >= totalSlotsY;
}

function isAtLeft(note) {
  return note.position.x <= 0
    || note.endPosition.x <= 0;
}

function isAtRight(totalSlotsX) {
  return (note) => note.position.x >= totalSlotsX
    || note.endPosition.x >= totalSlotsX;
}

function isAtTop(note) {
  return note.position.y <= 0
    || note.endPosition.y <= 0;
}
