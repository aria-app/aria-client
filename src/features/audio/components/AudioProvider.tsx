import { FC, ProviderProps, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import { Dawww } from '../../../dawww';
import { playbackState, position } from '../atoms';
import { AudioManagerContext } from '../contexts';

export const AudioProvider: FC<Partial<ProviderProps<any>>> = (props) => {
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
};
