import song from '../song';
import { NAME } from './constants';

const get = state => state[NAME];

export const getSelectedSequenceId = state => get(state).selectedSequenceId;
export const getStagedTrackId = state => get(state).stagedTrackId;

export const getSelectedSequence = state =>
  song.selectors.getSequenceById(getSelectedSequenceId(state))(state) || {};

export const getStagedTrack = (state) => {
  const id = getStagedTrackId(state);
  const track = song.selectors.getTrackById(id)(state);
  return track || {};
};

export const getStagedTrackSequences = (state) => {
  const id = getStagedTrackId(state);
  const sequences = song.selectors.getSequencesByTrackId(id)(state);
  return sequences || [];
};
