import { DiffDeleted } from 'deep-diff';

import * as actions from '../../../actions';
import { DawwwTrack, DiffInterpreter } from '../../../types';

export const interpretTrackDeletedDiff: DiffInterpreter<
  DiffDeleted<DawwwTrack>
> = ({ lhs }) => {
  return actions.trackDeletionRequested(lhs);
};
