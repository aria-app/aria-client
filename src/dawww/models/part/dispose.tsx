import isFunction from 'lodash/fp/isFunction';

export function dispose(part) {
  if (!isFunction(part.dispose)) return;

  part.dispose();
}
