import { NAME } from './constants';

const get = state => state[NAME];

const getIsPanning = state => get(state).isPanning;
const getPanStartPosition = state => get(state).panStartPosition;
const getMeasureCount = state => get(state).measureCount;
const getMousePosition = state => get(state).mousePosition;
const getScale = state => get(state).scale;
const getScrollLeft = state => get(state).scrollLeft;
const getScrollTop = state => get(state).scrollTop;
const getSynthType = state => get(state).synthType;
const getToolType = state => get(state).toolType;
const getPreviousToolType = state => get(state).previousToolType;

export default {
  get,
  getIsPanning,
  getPanStartPosition,
  getMeasureCount,
  getMousePosition,
  getScale,
  getScrollLeft,
  getScrollTop,
  getSynthType,
  getPreviousToolType,
  getToolType,
};
