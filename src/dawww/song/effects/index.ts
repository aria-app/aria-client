import * as actions from '../../actions';
import { DawwwEffects } from '../../types';
import { handleBPMEdit } from './handleBPMEdit';
import { handleFocusedSequenceIdEdit } from './handleFocusedSequenceIdEdit';
import { handleSongUpdate } from './handleSongUpdate';
import { handleTrackDeletionRequest } from './handleTrackDeletionRequest';

export const songEffects: DawwwEffects = (getState, action, shared) => {
  switch (action.type) {
    case actions.BPM_EDITED:
      handleBPMEdit(getState, action, shared);
      break;
    case actions.FOCUSED_SEQUENCE_ID_EDITED:
      handleFocusedSequenceIdEdit(getState, action, shared);
      break;
    case actions.SONG_UPDATED:
      handleSongUpdate(getState, action, shared);
      break;
    case actions.TRACK_DELETION_REQUESTED:
      handleTrackDeletionRequest(getState, action, shared);
      break;
    default:
  }
};
