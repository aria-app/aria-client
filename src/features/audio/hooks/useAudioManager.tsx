import React from 'react';

import { AudioManagerContext } from '../contexts';

export default function useAudioManager(): any {
  return React.useContext(AudioManagerContext);
}
