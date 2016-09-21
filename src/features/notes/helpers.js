// @flow
import _ from 'lodash';
import shared from '../shared';

type Point = {
  x : number,
  y: number,
}

export function addPoints(a : Point, b : Point) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

export function getType(synth : any) {
  return synth.voices[0].oscillator.type;
}

export function somePointOutside(points : Point[], measureCount : number) {
  const totalSlotsX = measureCount * 8 * 4 - 1;
  const totalSlotsY = shared.constants.octaveRange.length * 12 - 1;

  return _.some(points, point =>
    point.x < 0
    || point.x > totalSlotsX
    || point.y < 0
    || point.y > totalSlotsY
  );
}
