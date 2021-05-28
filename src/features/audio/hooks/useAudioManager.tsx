import { useContext } from 'react';

import { AudioManagerContext } from '../contexts';

export default function useAudioManager(): any {
  return useContext(AudioManagerContext);
}
