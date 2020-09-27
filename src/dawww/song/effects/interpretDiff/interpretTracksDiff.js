import getOr from 'lodash/fp/getOr';
import * as actions from '../../../actions';
import * as constants from '../../../constants';
import { interpretTrackAddedDiff } from './interpretTrackAddedDiff';
import { interpretTrackDeletedDiff } from './interpretTrackDeletedDiff';
import { interpretTrackEditedDiff } from './interpretTrackEditedDiff';

export function interpretTracksDiff(diff, song) {
  switch (getOr('', 'kind', diff)) {
    case constants.DIFF_KIND_D:
      return interpretTrackDeletedDiff(diff);
    case constants.DIFF_KIND_E:
      return interpretTrackEditedDiff(diff);
    case constants.DIFF_KIND_N:
      return interpretTrackAddedDiff(diff, song);
    default:
      return actions.unknown();
  }
}
