import song from '../song';
import { NAME } from './constants';

const get = state => state[NAME];

export const getRedos = state => get(state).redos;
export const getSelectedSequenceId = state => get(state).selectedSequenceId;
export const getStagedTrackId = state => get(state).stagedTrackId;
export const getUndos = state => get(state).undos;

export const getSelectedSequence = state =>
  song.selectors.getSequenceById(getSelectedSequenceId(state))(state) || {};

export const getStagedTrack = (state) => {
  const id = getStagedTrackId(state);
  const track = song.selectors.getTrackById(id)(state);
  return track || {};
};
