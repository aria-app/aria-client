import isFunction from 'lodash/fp/isFunction';

export function dispose(volumeNode) {
  if (!isFunction(volumeNode.dispose)) return;

  volumeNode.dispose();
}
