import * as actionTypes from './action-types';

export const bpmModalClosed = () => ({
  type: actionTypes.BPM_MODAL_CLOSED,
});

export const bpmModalOpened = () => ({
  type: actionTypes.BPM_MODAL_OPENED,
});

export const fileDragCancelled = () => ({
  type: actionTypes.FILE_DRAG_CANCELLED,
});

export const fileDragStarted = () => ({
  type: actionTypes.FILE_DRAG_STARTED,
});

export const initialized = () => ({
  type: actionTypes.INITIALIZED,
});
