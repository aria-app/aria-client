import * as actionTypes from './action-types';

export const bpmModalClosed = () => ({
  type: actionTypes.BPM_MODAL_CLOSED,
});

export const bpmModalOpened = () => ({
  type: actionTypes.BPM_MODAL_OPENED,
});

export const initialized = () => ({
  type: actionTypes.INITIALIZED,
});
