import { NAME } from './constants';

const get = state => state[NAME];

export const getIsBPMModalOpen = state => get(state).isBPMModalOpen;
