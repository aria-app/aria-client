import { useRecoilValue } from 'recoil';

import { PlaybackState } from '../../../types';
import { playbackState } from '../atoms';

export function usePlaybackState(): PlaybackState {
  return useRecoilValue(playbackState);
}
