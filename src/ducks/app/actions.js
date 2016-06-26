import * as actionTypes from './action-types';

export const bpmModalClosed = () => ({
  type: actionTypes.BPM_MODAL_CLOSED,
});

export const initialized = () => ({
  type: actionTypes.INITIALIZED,
});

export const bpmModalOpened = () => ({
  type: actionTypes.BPM_MODAL_OPENED,
});
