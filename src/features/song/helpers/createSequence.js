import isNil from 'lodash/fp/isNil';
import { v4 } from 'uuid';

export function createSequence({ id, measureCount, position, trackId }) {
  if (isNil(position)) {
    throw new Error('Please provide a position to createSequence');
  }

  if (isNil(trackId)) {
    throw new Error('Please provide a trackId to createSequence');
  }

  return {
    id: id || v4(),
    measureCount: measureCount || 1,
    position,
    trackId,
  };
}
