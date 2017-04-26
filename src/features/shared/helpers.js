import { v4 } from 'uuid';

export const getId = () => v4();

export function getPointOffset(start, end) {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  };
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
