import { State } from '../types';

type GetLoopEndPoint = (state: State) => number;

export const getLoopEndPoint: GetLoopEndPoint = ({ song }) => {
  const { focusedSequenceId = -1, measureCount, sequences } = song;
  const focusedSequence = sequences[focusedSequenceId];

  return focusedSequence
    ? focusedSequence.position + focusedSequence.measureCount
    : measureCount;
};
