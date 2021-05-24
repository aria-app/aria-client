import { DiffNew } from 'deep-diff';
import some from 'lodash/fp/some';

import * as actions from '../../../actions';
import { DawwwSong, DawwwTrack, DiffInterpreter } from '../../../types';

export const interpretTrackAddedDiff: DiffInterpreter<DiffNew<DawwwTrack>> = (
  { rhs },
  song,
) => {
  const { tracks } = song as DawwwSong;
  const isAnyTrackSoloing = some<Record<number, DawwwTrack>>(
    (track) => track.isSoloing,
    tracks,
  );

  return actions.trackAdded({ isAnyTrackSoloing, track: rhs });
};
