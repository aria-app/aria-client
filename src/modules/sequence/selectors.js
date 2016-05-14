import { NAME } from './constants';

const get = state => state[NAME];

const getIsPanning = state => get(state).isPanning;
const getPanStartPosition = state => get(state).panStartPosition;
const getMeasureCount = state => get(state).measureCount;
const getScale = state => get(state).scale;
const getSynthType = state => get(state).synthType;
const getToolType = state => get(state).toolType;
const getPreviousToolType = state => get(state).previousToolType;

export default {
  get,
  getIsPanning,
  getPanStartPosition,
  getMeasureCount,
  getScale,
  getSynthType,
  getPreviousToolType,
  getToolType,
};
