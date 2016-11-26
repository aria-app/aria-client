import { NAME } from './constants';

const get = state => state[NAME];

export const getWindowHeight = state => get(state).windowHeight;
export const getWindowWidth = state => get(state).windowWidth;
