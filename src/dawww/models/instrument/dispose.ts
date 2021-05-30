import isFunction from 'lodash/fp/isFunction';

import { Instrument } from '../../types';

export function dispose(instrument: Instrument): void {
  if (!isFunction(instrument?.dispose)) return;

  instrument.dispose();
}
