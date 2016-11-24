import { NAME } from './constants';

export const START_POINT_SET = `${NAME}/START_POINT_SET`;
export const STARTED = `${NAME}/STARTED`;
export const STOPPED = `${NAME}/STOPPED`;
export const UPDATED = `${NAME}/UPDATED`;


export const started = (scrollLeftElement, scrollTopElement, e) => ({
  type: STARTED,
  e,
  scrollLeftElement,
  scrollTopElement,
});

export const startPointSet = startPoint => ({
  type: START_POINT_SET,
  startPoint,
});

export const stopped = () => ({
  type: STOPPED,
});

export const updated = (scrollLeftElement, scrollTopElement, e) => ({
  type: UPDATED,
  e,
  scrollLeftElement,
  scrollTopElement,
});
