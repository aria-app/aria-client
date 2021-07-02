import { useContext } from 'react';

import { AudioManagerType } from '../../../types';
import { AudioManagerContext } from '../contexts';

export function useAudioManager(): AudioManagerType {
  return useContext(AudioManagerContext);
}
