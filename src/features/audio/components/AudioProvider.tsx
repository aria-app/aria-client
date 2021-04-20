import React from 'react';
import { useSetRecoilState } from 'recoil';

import Dawww from '../../../dawww';
import { playbackState, position } from '../atoms';
import { AudioManagerContext } from '../contexts';

export default function AudioProvider(props: any) {
  const audioManager = React.useRef(Dawww({}));
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
