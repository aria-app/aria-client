import { NAME } from '../constants';

export const UNDO_POPPED = `${NAME}/UNDO_POPPED`;
export const UNDO_PUSHED = `${NAME}/UNDO_PUSHED`;
export const UNDOS_SET = `${NAME}/UNDOS_SET`;

export const undoPopped = () => ({
  type: UNDO_POPPED,
});

export const undoPushed = () => ({
  type: UNDO_PUSHED,
});

export const undosSet = undos => ({
  type: UNDOS_SET,
  undos,
});
