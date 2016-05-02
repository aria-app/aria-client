import _ from 'lodash';
import sound from 'modules/sound';

export function createNote({ id, position }) {
  return {
    id: id || _.uniqueId('note'),
    name: sound.helpers.getNoteName(position.y),
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
