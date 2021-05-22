import { DiffDeleted } from 'deep-diff';

import { Track } from '../../../../types';
import * as actions from '../../../actions';
import { DiffInterpreter } from '../../../types';

export const interpretTrackDeletedDiff: DiffInterpreter<DiffDeleted<Track>> = ({
  lhs,
}) => {
  return actions.trackDeletionRequested(lhs);
};
