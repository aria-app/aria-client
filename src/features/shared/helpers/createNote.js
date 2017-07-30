import isNil from 'lodash/fp/isNil';
import shortid from 'shortid';

export function createNote({ id, points, sequenceId }) {
  if (isNil(points)) {
    throw new Error('Please provide points to createNote');
  }

  if (isNil(sequenceId)) {
    throw new Error('Please provide a sequenceId to createNote');
  }

  return {
    id: id || shortid.generate(),
    points,
    sequenceId,
  };
}
