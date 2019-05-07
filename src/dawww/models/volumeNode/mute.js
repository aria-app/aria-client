import set from 'lodash/set';

export function mute(volumeNode) {
  set(volumeNode, 'mute', true);
}
