import { DawwwEffects } from '../../types';

export const handleTrackVolumeEdit: DawwwEffects = (
  getState,
  action,
  shared,
) => {
  const { id, value = 0 } = action.payload;
  const { volumeNodes } = getState();

  shared.models.volumeNode.setVolume(volumeNodes[id], value);
};
