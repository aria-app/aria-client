import React from 'react';
import { useSetRecoilState } from 'recoil';

import { playbackState, position } from '../atoms';
import { AudioManagerContext } from '../contexts';
import dawww from '../dawww';

export default function AudioProvider(props) {
  const audioManager = React.useRef(dawww);
  const setPlaybackState = useSetRecoilState(playbackState);
  const setPosition = useSetRecoilState(position);

  React.useEffect(() => {
    audioManager.current.onPlaybackStateChange(setPlaybackState);
    audioManager.current.onPositionChange(setPosition);
  }, [audioManager, setPlaybackState, setPosition]);

  return (
    <AudioManagerContext.Provider value={audioManager.current} {...props} />
  );
}
