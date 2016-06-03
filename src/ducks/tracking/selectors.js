import { NAME } from './constants';

const get = state => state[NAME];

export const getSelectedSequenceId = state => get(state).selectedSequenceId;
export const getStagedTrack = state => get(state).stagedTrack;
