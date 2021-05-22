import * as actions from '../../../actions';
import { DiffInterpreter } from '../../../types';
import { interpretTrackAddedDiff } from './interpretTrackAddedDiff';
import { interpretTrackDeletedDiff } from './interpretTrackDeletedDiff';
import { interpretTrackEditedDiff } from './interpretTrackEditedDiff';

export const interpretTracksDiff: DiffInterpreter = (diff, song) => {
  switch (diff.kind) {
    case 'D':
      return interpretTrackDeletedDiff(diff, song);
    case 'E':
      return interpretTrackEditedDiff(diff, song);
    case 'N':
      return interpretTrackAddedDiff(diff, song);
    default:
      return actions.unknown();
  }
};
