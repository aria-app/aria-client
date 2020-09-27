import getOr from 'lodash/fp/getOr';

export function handleTrackVolumeEdit(getState, action, shared) {
  const id = getOr('', 'payload.id', action);
  const volumeNode = getOr({}, `volumeNodes[${id}]`, getState());
  const volume = getOr(0, 'payload.value', action);

  shared.models.volumeNode.setVolume(volumeNode, volume);
}
