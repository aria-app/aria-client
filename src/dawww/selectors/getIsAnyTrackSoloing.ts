import some from 'lodash/fp/some';

import { DawwwTrack, State } from '../types';

export const getIsAnyTrackSoloing: (state: State) => boolean = (state) => {
  const { tracks } = state.song;

  return some<Record<number, DawwwTrack>>((track) => track.isSoloing, tracks);
};
