import { State } from '../types';

type GetLoopStartPoint = (state: State) => number;

export const getLoopStartPoint: GetLoopStartPoint = ({ song }) => {
  const { focusedSequenceId = -1, sequences } = song;
  const focusedSequence = sequences[focusedSequenceId];

  return focusedSequence?.position || 0;
};
