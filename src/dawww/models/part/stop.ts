import { Part } from '../../types';

export function stop(part: Part): void {
  part.stop(0);
}
