import { Note, Point } from '../../types';
import { DawwwNote, DawwwPoint } from '../types';

export function noteToDawwwNote({ id, points, sequence }: Note): DawwwNote {
  return {
    id,
    points: points.map(pointToDawwwPoint),
    sequenceId: sequence.id,
  };
}

function pointToDawwwPoint({ x, y }: Point): DawwwPoint {
  return { x, y };
}
