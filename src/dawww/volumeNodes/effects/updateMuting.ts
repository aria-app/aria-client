import { DawwwEffects } from '../../types';

export const updateMuting: DawwwEffects = (getState, action, shared) => {
  const { volumeNodes } = getState();
  const anySolo = shared.selectors.getIsAnyTrackSoloing(getState());

  Object.keys(volumeNodes).forEach((key) => {
    const { song } = getState();
    const { isMuted = false, isSoloing = false } = song.tracks[key];
    const isOneOfSomeSoloingTracks = anySolo && !isMuted && isSoloing;
    const noMutingOrSoloing = !anySolo && !isMuted && !isSoloing;

    if (isOneOfSomeSoloingTracks || noMutingOrSoloing) {
      shared.models.volumeNode.unmute(volumeNodes[key]);
      return;
    }

    shared.models.volumeNode.mute(volumeNodes[key]);
  });
};
