import _ from 'lodash';
import shared from 'ducks/shared';

export function addPoints(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

export function getType(synth) {
  return synth.voices[0].oscillator.type;
}

export function sizeToSeconds(size, bpm) {
  return ((60 / bpm) / 8) * (size + 1);
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