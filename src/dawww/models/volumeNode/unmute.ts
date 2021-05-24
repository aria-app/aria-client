import { VolumeNode } from '../../types';

export function unmute(volumeNode: VolumeNode): void {
  volumeNode.mute = false;
}
