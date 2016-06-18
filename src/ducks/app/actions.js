import * as actionTypes from './action-types';

export const closeBPMModal = () => ({
  type: actionTypes.CLOSE_BPM_MODAL,
});

export const initialize = () => ({
  type: actionTypes.INITIALIZE,
});

export const openBPMModal = () => ({
  type: actionTypes.OPEN_BPM_MODAL,
});
