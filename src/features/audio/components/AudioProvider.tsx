import { ProviderProps, ReactElement, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import Dawww from '../../../dawww';
import { playbackState, position } from '../atoms';
import { AudioManagerContext } from '../contexts';

export default function AudioProvider(
  props: Partial<ProviderProps<any>>,
): ReactElement {
  const audioManager = useRef(Dawww({}));
  const setPlaybackState = useSetRecoilState(playbackState);
  const setPosition = useSetRecoilState(position);

  useEffect(() => {
    audioManager.current.onPlaybackStateChange(setPlaybackState);
    audioManager.current.onPositionChange(setPosition);
  }, [audioManager, setPlaybackState, setPosition]);

  return (
    <AudioManagerContext.Provider value={audioManager.current} {...props} />
  );
}
