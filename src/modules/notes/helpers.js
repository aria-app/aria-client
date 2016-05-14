import _ from 'lodash';
import * as constants from './constants';

export function addPositions(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

export function createNote({
  id = _.uniqueId('note'),
  slots = 2,
  position,
}) {
  return {
    name: getNoteName(position.y),
    id,
    slots,
    position,
  };
}

export function getMousePosition(el, e) {
  const offsetLeft = el.parentElement.parentElement.offsetLeft;
  const offsetTop = el.parentElement.parentElement.offsetTop;
  const scrollLeft = el.parentElement.parentElement.scrollLeft;
  const scrollTop = el.parentElement
    .parentElement
    .parentElement
    .parentElement.scrollTop;
  const toSlotNumber = num => Math.floor(num / 40);
  return {
    x: toSlotNumber(e.pageX - offsetLeft + scrollLeft),
    y: toSlotNumber(e.pageY - offsetTop + scrollTop),
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

export function slotsToLength(slots) {
  return `0:0:${slots * 0.5}`;
}

export function someNoteWillMoveOutside(notes, offset, measureCount) {
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
