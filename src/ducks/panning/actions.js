import actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function setIsPanning(isPanning) {
  return {
    type: actionTypes.SET_IS_PANNING,
    isPanning,
  };
}

export function setStartPoint(startPoint) {
  return {
    type: actionTypes.SET_START_POSITION,
    startPoint,
  };
}

export function start(scrollLeftElement, scrollTopElement, e) {
  return (dispatch, getState) => {
    const startPoint = helpers.getStartPoint(scrollLeftElement, scrollTopElement, e);
    dispatch(setIsPanning(true));
    dispatch(setStartPoint(startPoint));
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
    const startPoint = selectors.getStartPoint(getState());
    helpers.panScrollContainer(scrollLeftElement, scrollTopElement, e, startPoint);
  };
}
