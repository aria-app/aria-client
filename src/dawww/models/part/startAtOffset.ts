import { Part, ToneTime } from '../../types';

export function startAtOffset(offsetTime: ToneTime, part: Part) {
  part.start(undefined, offsetTime);
}
