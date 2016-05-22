import _ from 'lodash';
import shared from 'ducks/shared';
import * as constants from './constants';

export function addPoints(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

export function createNote({
  id = _.uniqueId('note'),
  points,
}) {
  if (points.length < 2) {
    throw new Error('No points supplied to createNote');
  }

  return {
    id,
    points,
  };
}

export function getScale() {
  return _(shared.constants.octaveRange)
    .flatMap(octave => _.range(12).map(step => {
      const yPoint = (octave * 12) + step;
      return {
        name: shared.helpers.getNoteName(yPoint),
        yPoint,
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
  const totalSlotsY = shared.constants.octaveRange.length * 12 - 1;

  return _.some(points, point =>
    point.x < 0
    || point.x > totalSlotsX
    || point.y < 0
    || point.y > totalSlotsY
  );
}
