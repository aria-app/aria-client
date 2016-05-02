import _ from 'lodash';
import sound from 'modules/sound';

export function addPositions(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

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

export function getPanStart(el, e) {
  return {
    scrollLeft: el.parentElement.parentElement.scrollLeft,
    scrollTop: el.parentElement.parentElement.parentElement.parentElement.scrollTop,
    x: e.pageX,
    y: e.pageY,
  };
}

export function panScrollContainer(el, e, start) {
  const dx = e.pageX - start.x;
  const dy = e.pageY - start.y;
  const scrollLeftElement = el.parentElement.parentElement;
  const scrollTopElement = el.parentElement
    .parentElement
    .parentElement
    .parentElement;

  scrollLeftElement.scrollLeft = start.scrollLeft - dx;
  scrollTopElement.scrollTop = start.scrollTop - dy;
}
