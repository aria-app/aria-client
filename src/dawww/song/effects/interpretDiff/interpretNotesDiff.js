import getOr from 'lodash/fp/getOr';

import * as actions from '../../../actions';
import * as constants from '../../../constants';
import { interpretNoteAddedDiff } from './interpretNoteAddedDiff';
import { interpretNoteArrayEditedDiff } from './interpretNoteArrayEditedDiff';
import { interpretNoteDeletedDiff } from './interpretNoteDeletedDiff';
import { interpretNoteEditedDiff } from './interpretNoteEditedDiff';

export function interpretNotesDiff(diff) {
  switch (getOr('', 'kind', diff)) {
    case constants.DIFF_KIND_A:
      return interpretNoteArrayEditedDiff(diff);
    case constants.DIFF_KIND_D:
      return interpretNoteDeletedDiff(diff);
    case constants.DIFF_KIND_E:
      return interpretNoteEditedDiff(diff);
    case constants.DIFF_KIND_N:
      return interpretNoteAddedDiff(diff);
    default:
      return actions.unknown();
  }
}
