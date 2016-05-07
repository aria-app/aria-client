import _ from 'lodash';
import sequence from 'modules/sequence';
import sound from 'modules/sound';

export function addPositions(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

export function createNote({
  id = _.uniqueId('note'),
  length = slotsToLength(1),
  position,
}) {
  return {
    name: sound.helpers.getNoteName(position.y),
    id,
    length,
    position,
  };
}

export function getMousePosition(el, pageX, pageY) {
  const offsetLeft = el.parentElement.parentElement.offsetLeft;
  const offsetTop = el.parentElement.parentElement.offsetTop;
  const scrollLeft = el.parentElement.parentElement.scrollLeft;
  const scrollTop = el.parentElement
    .parentElement
    .parentElement
    .parentElement.scrollTop;
  const toSlotNumber = num => Math.floor(num / 40);
  return {
    x: toSlotNumber(pageX - offsetLeft + scrollLeft),
    y: toSlotNumber(pageY - offsetTop + scrollTop),
  };
}

export function lengthToSlots(length) {
  return parseInt(length.split(':')[2], 10) / 0.5;
}

export function someNoteWillMoveOutside(notes, offset, measureCount) {
  const totalSlotsX = measureCount * 8 * 4 - 1;
  const totalSlotsY = sound.constants.octaveRange.length * 12 - 1;
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

export function slotsToLength(slots) {
  return `0:0:${slots * 0.5}`;
}
