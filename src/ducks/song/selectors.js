import { NAME } from './constants';

const get = state => state[NAME];

export const getMeasureCount = state => get(state).measureCount;
export const getMousePoint = state => get(state).mousePoint;
export const getScale = state => get(state).scale;
export const getScrollLeft = state => get(state).scrollLeft;
export const getScrollTop = state => get(state).scrollTop;
export const getSynthType = state => get(state).synthType;
export const getToolType = state => get(state).toolType;
export const getPreviousToolType = state => get(state).previousToolType;
