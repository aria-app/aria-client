import set from 'lodash/set';

export function setVolume(volumeNode, value) {
  set(volumeNode, 'volume.value', value);
}
