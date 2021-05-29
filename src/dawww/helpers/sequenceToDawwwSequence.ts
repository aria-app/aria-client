import { Sequence } from '../../types';
import { DawwwSequence } from '../types';

export function sequenceToDawwwSequence({
  id,
  measureCount,
  position,
  track,
}: Sequence): DawwwSequence {
  return {
    id,
    measureCount,
    position,
    trackId: track.id,
  };
}
