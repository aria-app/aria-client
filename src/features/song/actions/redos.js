import { NAME } from '../constants';

export const REDO_POPPED = `${NAME}/REDO_POPPED`;
export const REDO_PUSHED = `${NAME}/REDO_PUSHED`;
export const REDOS_SET = `${NAME}/REDOS_SET`;

export const redoPopped = () => ({
  type: REDO_POPPED,
});

export const redoPushed = () => ({
  type: REDO_PUSHED,
});

export const redosSet = redos => ({
  type: REDOS_SET,
  redos,
});
