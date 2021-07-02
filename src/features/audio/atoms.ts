import { atom } from 'recoil';

import { Dawww } from '../../dawww';
import { PlaybackState } from '../../types';

export const playbackState = atom<PlaybackState>({
  default: Dawww.PLAYBACK_STATES.STOPPED,
  key: 'playbackState',
});

export const position = atom({
  default: 0,
  key: 'position',
});
