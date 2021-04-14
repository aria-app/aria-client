import * as actions from '../../actions';
import { handleTrackAdded } from './handleTrackAdded';
import { handleTrackVolumeEdit } from './handleTrackVolumeEdit';
import { updateMuting } from './updateMuting';

export default function effects(getState, action, shared) {
  switch (action.type) {
    case actions.TRACK_ADDED:
      handleTrackAdded(getState, action, shared);
      updateMuting(getState, action, shared);
      break;
    case actions.TRACK_DELETION_ACCEPTED:
      updateMuting(getState, action, shared);
      break;
    case actions.TRACK_IS_MUTED_EDITED:
      updateMuting(getState, action, shared);
      break;
    case actions.TRACK_IS_SOLOING_EDITED:
      updateMuting(getState, action, shared);
      break;
    case actions.TRACK_VOLUME_EDITED:
      handleTrackVolumeEdit(getState, action, shared);
      break;
    default:
  }
}
