import _ from 'lodash';
import * as constants from './constants';

export function getCenteredScroll(el) {
  return (el.scrollHeight / 2) - (el.offsetHeight / 2);
}

export function getNoteName(y) {
  const octaveNumber = ((constants.octaveRange.length - 1) - Math.floor(y / 12));
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

export function getPointOffset(start, end) {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  };
}

export function getScale() {
  return _(constants.octaveRange)
  .flatMap(octave => _.range(12).map((step) => {
    const y = (octave * 12) + step;
    return {
      name: getNoteName(y),
      y,
    };
  }))
  .value();
}

export function hideIf(condition) {
  return result => (condition ? null : result);
}

export function resolveOnMouseUp() {
  return new Promise((resolve) => {
    window.addEventListener('mouseup', doResolve, false);
    function doResolve() {
      window.removeEventListener('mouseup', doResolve, false);
      resolve();
    }
  });
}

export function setAtIds(array, obj) {
  return array.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), obj);
}

export function showIf(condition) {
  return result => (condition ? result : null);
}

export function sizeToTime(size) {
  if (!_.isNumber(size)) {
    throw new Error('Size must be a number');
  }

  return `(${size + 1} * 32n)`;
}
