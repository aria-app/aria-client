import { Track } from '../../../types';
import { DawwwEffects } from '../../types';

export const handleTrackAdded: DawwwEffects = (getState, action, shared) => {
  const { id } = action.payload.track as Track;
  const { instruments, volumeNodes } = getState();

  shared.toneAdapter.chainToMaster(instruments[id], volumeNodes[id]);
};
