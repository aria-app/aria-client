import isNil from 'lodash/fp/isNil';
import shortid from 'shortid';
import { Note, Point } from '../../types';

export function createNote(sequenceId: string, points: Array<Point>): Note {
  if (isNil(points)) {
    throw new Error('Please provide points to createNote');
  }

  if (isNil(sequenceId)) {
    throw new Error('Please provide a sequenceId to createNote');
  }

  return {
    id: shortid.generate(),
    points,
    sequenceId,
  };
}
