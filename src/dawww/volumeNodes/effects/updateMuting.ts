import getOr from 'lodash/fp/getOr';

import { DawwwEffects } from '../../types';

export const updateMuting: DawwwEffects = (getState, action, shared) => {
  const volumeNodes = getOr({}, 'volumeNodes', getState());
  const anySolo = shared.selectors.getIsAnyTrackSoloing(getState());

  Object.keys(volumeNodes).forEach((key) => {
    const volumeNode = volumeNodes[key];
    const isMuted = getOr(false, `song.tracks[${key}].isMuted`, getState());
    const isSoloing = getOr(false, `song.tracks[${key}].isSoloing`, getState());
    const isOneOfSomeSoloingTracks = anySolo && !isMuted && isSoloing;
    const noMutingOrSoloing = !anySolo && !isMuted && !isSoloing;

    if (isOneOfSomeSoloingTracks || noMutingOrSoloing) {
      shared.models.volumeNode.unmute(volumeNode);
      return;
    }

    shared.models.volumeNode.mute(volumeNode);
  });
};
