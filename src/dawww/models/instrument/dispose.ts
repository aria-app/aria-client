import invoke from 'lodash/fp/invoke';

import { Instrument } from '../../types';

export function dispose(instrument: Instrument): void {
  invoke('dispose', instrument);
}
