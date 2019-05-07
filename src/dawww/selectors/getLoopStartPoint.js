import getOr from 'lodash/fp/getOr';
import isEmpty from 'lodash/fp/isEmpty';

export const getLoopStartPoint = state => {
  const focusedSequenceId = getOr('', 'song.focusedSequenceId', state);
  const focusedSequence = getOr(
    {},
    `song.sequences[${focusedSequenceId}]`,
    state,
  );

  if (isEmpty(focusedSequence)) {
    return 0;
  }

  return getOr(0, 'position', focusedSequence);
};
