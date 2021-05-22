import some from 'lodash/fp/some';

import { Track } from '../../types';
import { State } from '../types';

export const getIsAnyTrackSoloing: (state: State) => boolean = (state) => {
  const { tracks } = state.song;

  return some<Record<number, Track>>((track) => track.isSoloing, tracks);
};
