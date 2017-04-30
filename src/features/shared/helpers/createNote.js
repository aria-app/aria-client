import isNil from 'lodash/fp/isNil';
import { v4 } from 'uuid';

export function createNote({ id, points, sequenceId }) {
  if (isNil(points)) {
    throw new Error('Please provide points to createNote');
  }

  if (isNil(sequenceId)) {
    throw new Error('Please provide a sequenceId to createNote');
  }

  return {
    id: id || v4(),
    points,
    sequenceId,
  };
}
