import _ from 'lodash';
import { NAME } from './constants';

const get = state => state[NAME];

export const getActiveSequence = (state) => get(state).activeSequence;
export const getSong = (state) => get(state).song;

export const getTracks = (state) => getSong(state).tracks;

export const getTrackById = (state, trackId) =>
  _.find(
    getTracks(state),
    { id: trackId },
  );

export const getSequenceById = (state, trackId, sequenceId) =>
  _.find(
    getTrackById(state, trackId).sequences,
    { id: sequenceId },
  );

export const getNotes = (state, trackId, sequenceId) =>
  getSequenceById(state, trackId, sequenceId).notes;
