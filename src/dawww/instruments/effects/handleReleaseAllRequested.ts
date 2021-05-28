import forEach from 'lodash/fp/forEach';

import { DawwwEffects } from '../../types';

export const handleReleaseAllRequested: DawwwEffects = (getState) => {
  const { instruments } = getState();

  forEach((instrument) => {
    instrument.releaseAll();
  }, instruments);
};
