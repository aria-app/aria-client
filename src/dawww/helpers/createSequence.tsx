import isNil from 'lodash/fp/isNil';
import shortid from 'shortid';

export function createSequence(trackId, position = 0, measureCount = 1) {
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
