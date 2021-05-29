import { State } from '../types';

type GetLoopEndPoint = (state: State) => number;

export const getLoopEndPoint: GetLoopEndPoint = ({ song }) => {
  const { focusedSequenceId, measureCount, sequences } = song;

  if (focusedSequenceId === null) {
    return measureCount;
  }

  const focusedSequence = sequences[focusedSequenceId];

  return focusedSequence
    ? focusedSequence.position + focusedSequence.measureCount
    : measureCount;
};
