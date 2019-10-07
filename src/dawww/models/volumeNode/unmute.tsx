import set from 'lodash/set';

export function unmute(volumeNode) {
  set(volumeNode, 'mute', false);
}
