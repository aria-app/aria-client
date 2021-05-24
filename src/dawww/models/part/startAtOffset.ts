import { Part, ToneTime } from '../../types';

export function startAtOffset(offsetTime: ToneTime, part: Part): void {
  part.start(undefined, offsetTime);
}
