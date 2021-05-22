import { Part } from '../../types';

export function disableLooping(part: Part): void {
  part.loop = false;
}
