import { DiffNew } from 'deep-diff';
import some from 'lodash/fp/some';

import { Track } from '../../../../types';
import * as actions from '../../../actions';
import { DiffInterpreter } from '../../../types';

export const interpretTrackAddedDiff: DiffInterpreter<DiffNew<Track>> = (
  { rhs },
  { tracks },
) => {
  const isAnyTrackSoloing = some<Record<number, Track>>(
    (track) => track.isSoloing,
    tracks,
  );

  return actions.trackAdded({ isAnyTrackSoloing, track: rhs });
};
