import isFunction from 'lodash/fp/isFunction';

import { Part } from '../../types';

export function dispose(part: Part): void {
  if (!isFunction(part?.dispose)) return;

  part.dispose();
}
