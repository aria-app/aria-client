import { State } from '../types';

type GetLoopStartPoint = (state: State) => number;

export const getLoopStartPoint: GetLoopStartPoint = ({ song }) => {
  const { focusedSequenceId, sequences } = song;

  if (focusedSequenceId === null) {
    return 0;
  }

  const focusedSequence = sequences[focusedSequenceId];

  return focusedSequence?.position || 0;
};
