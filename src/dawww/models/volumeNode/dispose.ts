import isFunction from 'lodash/fp/isFunction';

import { VolumeNode } from '../../types';

export function dispose(volumeNode: VolumeNode): void {
  if (!isFunction(volumeNode.dispose)) return;

  volumeNode.dispose();
}
