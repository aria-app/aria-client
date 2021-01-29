import { atom } from 'recoil';

import Dawww from '../../dawww';

export const playbackState = atom({
  default: Dawww.PLAYBACK_STATES.STOPPED,
  key: 'playbackState',
});

export const position = atom({
  default: 0,
  key: 'position',
});
