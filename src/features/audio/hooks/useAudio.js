import React from 'react';

import AudioContext from '../contexts/AudioContext';

export default function useAudio() {
  return React.useContext(AudioContext);
}
