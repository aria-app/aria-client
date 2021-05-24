import { VolumeNode } from '../../types';

export function mute(volumeNode: VolumeNode): void {
  volumeNode.mute = true;
}
