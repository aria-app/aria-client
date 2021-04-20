import React from 'react';

import { AudioManagerContext } from '../contexts';

export default function useAudioManager() {
  return React.useContext(AudioManagerContext);
}
