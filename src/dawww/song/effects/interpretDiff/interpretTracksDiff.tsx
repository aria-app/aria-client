import getOr from 'lodash/fp/getOr';
import * as actions from '../../../actions';
import * as constants from '../../../constants';
import { interpretTrackAddedDiff } from './interpretTrackAddedDiff';
import { interpretTrackDeletedDiff } from './interpretTrackDeletedDiff';
import { interpretTrackEditedDiff } from './interpretTrackEditedDiff';

export function interpretTracksDiff(diff, ...rest) {
  switch (getOr('', 'kind', diff)) {
    case constants.DIFF_KIND_D:
      return interpretTrackDeletedDiff(diff, ...rest);
    case constants.DIFF_KIND_E:
      return interpretTrackEditedDiff(diff, ...rest);
    case constants.DIFF_KIND_N:
      return interpretTrackAddedDiff(diff, ...rest);
    default:
      return actions.unknown();
  }
}
