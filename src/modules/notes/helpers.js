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

export function somePointOutside(points, measureCount) {
  const totalSlotsX = measureCount * 8 * 4 - 1;
  const totalSlotsY = constants.octaveRange.length * 12 - 1;

  return _.some(points, point =>
    point.x < 0
    || point.x > totalSlotsX
    || point.y < 0
    || point.y > totalSlotsY
  );
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
