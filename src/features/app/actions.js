import { NAME } from './constants';

export const BPM_MODAL_CLOSED = `${NAME}/BPM_MODAL_CLOSED`;
export const BPM_MODAL_OPENED = `${NAME}/BPM_MODAL_OPENED`;
export const FILE_DRAG_CANCELLED = `${NAME}/FILE_DRAG_CANCELLED`;
export const FILE_DRAG_STARTED = `${NAME}/FILE_DRAG_STARTED`;
export const FILE_DROPPED = `${NAME}/FILE_DROPPED`;

export const bpmModalClosed = () => ({
  type: BPM_MODAL_CLOSED,
});

export const bpmModalOpened = () => ({
  type: BPM_MODAL_OPENED,
});

export const fileDragCancelled = () => ({
  type: FILE_DRAG_CANCELLED,
});

export const fileDragStarted = () => ({
  type: FILE_DRAG_STARTED,
});

export const fileDropped = (file) => ({
  type: FILE_DROPPED,
  file,
});
