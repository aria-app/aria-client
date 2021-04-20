import getOr from 'lodash/fp/getOr';
import isEmpty from 'lodash/fp/isEmpty';

export const getLoopEndPoint = (state) => {
  const focusedSequenceId = getOr('', 'song.focusedSequenceId', state);
  const focusedSequence = getOr(
    {},
    `song.sequences[${focusedSequenceId}]`,
    state,
  );
  const measureCount = getOr(0, 'song.measureCount', state);

  if (isEmpty(focusedSequence)) {
    return measureCount;
  }

  const focusedSequencePosition = getOr(0, 'position', focusedSequence);
  const focusedSequenceMeasureCount = getOr(0, 'measureCount', focusedSequence);

  return focusedSequencePosition + focusedSequenceMeasureCount;
};
