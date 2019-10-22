import isNil from 'lodash/fp/isNil';
import shortid from 'shortid';
import { Sequence } from '../../types';

export function createSequence(
  trackId: string,
  position = 0,
  measureCount = 1,
): Sequence {
  if (isNil(trackId)) {
    throw new Error('Please provide a trackId to createSequence');
  }

  return {
    id: shortid.generate(),
    measureCount,
    position,
    trackId,
  };
}
