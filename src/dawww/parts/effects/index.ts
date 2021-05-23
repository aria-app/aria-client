import * as actions from '../../actions';
import { DawwwEffects } from '../../types';
import { acceptSequenceDeletion } from './acceptSequenceDeletion';
import { disablePartLooping } from './disablePartLooping';
import { disposePart } from './disposePart';
import { reloadSequence } from './reloadSequence';
import { setPartEvents } from './setPartEvents';
import { setPartEventsByNoteId } from './setPartEventsByNoteId';
import { startPart } from './startPart';

export const partsEffects: DawwwEffects = (getState, action, shared) => {
  switch (action.type) {
    case actions.NOTE_ADDED:
    case actions.NOTE_DELETED:
    case actions.NOTE_POINT_ADDED:
    case actions.NOTE_POINT_DELETED:
    case actions.NOTE_POINT_X_EDITED:
    case actions.NOTE_POINT_Y_EDITED:
      setPartEventsByNoteId(getState, action, shared);
      break;
    case actions.SEQUENCE_ADDED:
      setPartEvents(getState, action, shared);
      startPart(getState, action, shared);
      disablePartLooping(getState, action, shared);
      break;
    case actions.SEQUENCE_DELETION_REQUESTED:
      disposePart(getState, action, shared);
      acceptSequenceDeletion(getState, action, shared);
      break;
    case actions.SEQUENCE_MEASURE_COUNT_EDITED:
      reloadSequence(getState, action, shared);
      break;
    case actions.SEQUENCE_POSITION_EDITED:
      reloadSequence(getState, action, shared);
      break;
    default:
  }
};
