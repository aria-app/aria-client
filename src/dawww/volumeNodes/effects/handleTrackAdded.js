import getOr from 'lodash/fp/getOr';

export function handleTrackAdded(getState, action, shared) {
  const id = getOr('', 'payload.track.id', action);
  const instrument = getOr({}, `instruments[${id}]`, getState());
  const volumeNode = getOr({}, `volumeNodes[${id}]`, getState());

  shared.toneAdapter.chainToMaster(instrument, volumeNode);
}
