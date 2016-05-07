import _ from 'lodash';
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

export function slotsToLength(slots) {
  return `0:0:${slots * 0.5}`;
}
