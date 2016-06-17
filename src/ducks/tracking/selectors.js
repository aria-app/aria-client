import song from 'ducks/song';
import { NAME } from './constants';

const get = state => state[NAME];

export const getSelectedSequenceId = state => get(state).selectedSequenceId;
export const getStagedTrack = state => get(state).stagedTrack;

export const getSelectedSequence = state =>
  song.selectors.getSequenceById(getSelectedSequenceId(state))(state) || {};
