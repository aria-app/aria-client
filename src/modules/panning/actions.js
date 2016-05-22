import actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function setIsPanning(isPanning) {
  return {
    type: actionTypes.SET_IS_PANNING,
    isPanning,
  };
}

export function setStartPosition(startPosition) {
  return {
    type: actionTypes.SET_START_POSITION,
    startPosition,
  };
}

export function start(scrollLeftElement, scrollTopElement, e) {
  return (dispatch, getState) => {
    const startPosition = helpers.getStartPosition(scrollLeftElement, scrollTopElement, e);
    dispatch(setIsPanning(true));
    dispatch(setStartPosition(startPosition));
    window.addEventListener('mouseup', () => {
      const isPanning = selectors.getIsPanning(getState());
      if (isPanning) {
        dispatch(stop());
      }
    });
  };
}

export function stop() {
  return (dispatch, getState) => {
    if (!selectors.getIsPanning(getState())) return;
    dispatch(setIsPanning(false));
  };
}

export function update(scrollLeftElement, scrollTopElement, e) {
  return (dispatch, getState) => {
    const startPosition = selectors.getStartPosition(getState());
    helpers.panScrollContainer(scrollLeftElement, scrollTopElement, e, startPosition);
  };
}
