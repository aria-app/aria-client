import * as actions from '../../actions';
import { DawwwEffects } from '../../types';

export const handleTrackDeletionRequest: DawwwEffects = (
  getState,
  action,
  { dispatch, models },
) => {
  const { track } = action.payload;
  const { instruments, volumeNodes } = getState();

  models.instrument.dispose(instruments[track.id]);

  models.volumeNode.dispose(volumeNodes[track.id]);

  dispatch(actions.trackDeletionAccepted(track));
};
