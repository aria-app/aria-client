import React from 'react';
import { atom, useRecoilState } from 'recoil';

import Dawww from '../../../dawww';
import AudioContext from '../contexts/AudioContext';
import dawww from '../dawww';

const playbackState = atom({
  default: Dawww.PLAYBACK_STATES.STOPPED,
  key: 'playbackState',
});

const position = atom({
  default: 0,
  key: 'position',
});

export default function AudioProvider(props) {
  const audioManager = React.useRef(dawww);
  const [, setPlaybackState] = useRecoilState(playbackState);
  const [, setPosition] = useRecoilState(position);

  React.useEffect(() => {
    audioManager.current.onPlaybackStateChange(setPlaybackState);
    audioManager.current.onPositionChange(setPosition);
  }, [audioManager, setPlaybackState, setPosition]);

  return (
    <AudioContext.Provider
      value={{
        audioState: {
          playbackState,
          position,
        },
        audioManager: audioManager.current,
      }}
      {...props}
    />
  );
}
