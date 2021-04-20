import { useRecoilValue } from 'recoil';

import { playbackState } from '../atoms';

export default function usePlaybackState() {
  return useRecoilValue(playbackState);
}
