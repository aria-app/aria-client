import isNil from 'lodash/fp/isNil';
import shortid from 'shortid';

export function createSequence({ id, measureCount, position, trackId }) {
  if (isNil(trackId)) {
    throw new Error('Please provide a trackId to createSequence');
  }

  return {
    id: id || shortid.generate(),
    measureCount: measureCount || 1,
    position: position || 0,
    trackId,
  };
}
