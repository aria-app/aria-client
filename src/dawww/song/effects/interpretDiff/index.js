import getOr from 'lodash/fp/getOr';

import * as actions from '../../../actions';
import { interpretBPMEditedDiff } from './interpretBPMEditedDiff';
import { interpretFocusedSequenceIdEditedDiff } from './interpretFocusedSequenceIdEditedDiff';
import { interpretMeasureCountEditedDiff } from './interpretMeasureCountEditedDiff';
import { interpretNotesDiff } from './interpretNotesDiff';
import { interpretSequencesDiff } from './interpretSequencesDiff';
import { interpretTracksDiff } from './interpretTracksDiff';

export function interpretDiff(diff, song) {
  switch (getOr('', 'path[0]', diff)) {
    case 'bpm':
      return interpretBPMEditedDiff(diff);
    case 'focusedSequenceId':
      return interpretFocusedSequenceIdEditedDiff(diff);
    case 'measureCount':
      return interpretMeasureCountEditedDiff(diff);
    case 'notes':
      return interpretNotesDiff(diff);
    case 'sequences':
      return interpretSequencesDiff(diff);
    case 'tracks':
      return interpretTracksDiff(diff, song);
    default:
      return actions.unknown();
  }
}
