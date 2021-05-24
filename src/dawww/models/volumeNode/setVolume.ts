import { VolumeNode } from '../../types';

export function setVolume(volumeNode: VolumeNode, value: number): void {
  volumeNode.volume.value = value;
}
