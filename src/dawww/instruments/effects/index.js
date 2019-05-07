import * as actions from '../../actions';
import { handleNotePlay } from './handleNotePlay';
import { handlePartStepTriggered } from './handlePartStepTriggered';
import { handleTrackVoiceEdit } from './handleTrackVoiceEdit';

export default function effects(getState, action, shared) {
  switch (action.type) {
    case actions.NOTE_PLAYED:
      handleNotePlay(getState, action, shared);
      break;
    case actions.PART_STEP_TRIGGERED:
      handlePartStepTriggered(getState, action, shared);
      break;
    case actions.TRACK_VOICE_EDITED:
      handleTrackVoiceEdit(getState, action, shared);
      break;
    default:
  }
}
