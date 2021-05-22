import { Part, ToneTime } from '../../types';

export function startAtTime(startTime: ToneTime, part: Part): void {
  part.start(startTime);
}
