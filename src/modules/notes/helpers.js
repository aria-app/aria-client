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
  return {
    name: getNoteName(position.y),
    endName: endPosition ? getNoteName(endPosition.y) : undefined,
    endPosition: endPosition || { x: position.x + 1, y: position.y },
    id,
    position,
  };
}

export function getMousePosition(scrollLeftEl, scrollTopEl, e) {
  const toSlotNumber = num => Math.floor(num / 40);

  return {
    x: toSlotNumber(e.pageX - scrollLeftEl.offsetLeft + scrollLeftEl.scrollLeft),
    y: toSlotNumber(e.pageY - scrollLeftEl.offsetTop + scrollTopEl.scrollTop),
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
    return _.some(notes, note => note.position.x <= 0);
  } else if (offset.x === 1) {
    return _.some(notes, note => note.position.x >= totalSlotsX);
  } else if (offset.y === -1) {
    return _.some(notes, note => note.position.y <= 0);
  } else if (offset.y === 1) {
    return _.some(notes, note => note.position.y >= totalSlotsY);
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
