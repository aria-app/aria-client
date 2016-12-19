import { compose, filter, includes, map, some } from 'lodash/fp';
import shared from '../shared';
import { NAME } from './constants';

const get = state => state[NAME];

export const getActiveSequenceId = state => get(state).activeSequenceId;
export const getBPM = state => get(state).bpm || shared.constants.defaultBPM;
export const getId = state => get(state).id || '';
export const getMeasureCount = state => get(state).measureCount || 1;
export const getName = state => get(state).name || '';
export const getNotesDict = state => get(state).notes.dict;
export const getNotesIds = state => get(state).notes.ids;
export const getSequencesDict = state => get(state).sequences.dict;
export const getSequencesIds = state => get(state).sequences.ids;
export const getTracksDict = state => get(state).tracks.dict;
export const getTracksIds = state => get(state).tracks.ids;


// --- Notes ---

export const getNoteById = id => state =>
  getNotesDict(state)[id] || {};

export const getNotes = state =>
  getNotesIds(state).map(id => getNotesDict(state)[id]);

export const getNotesBySequenceId = sequenceId => state =>
  filter({ sequenceId })(getNotes(state));

export const getNotesBySequenceIds = sequenceIds => state =>
  getNotes(state).filter(n => includes(n.sequenceId)(sequenceIds));


// --- Sequence ---

export const getSequenceById = id => state =>
  getSequencesDict(state)[id];

export const getSequences = state =>
  getSequencesIds(state).map(id => getSequencesDict(state)[id]);

export const getSequencesByTrackId = trackId => state =>
  filter({ trackId })(getSequences(state));

export const getSequencesByTrackIds = trackIds => state =>
  filter(s => includes(s.trackId)(trackIds))(getSequences(state));

export const getDeepSequences = state =>
  getSequences(state).map(sequence => ({
    ...sequence,
    notes: filter({ sequenceId: sequence.id })(getNotes(state)),
  }));


// --- Active Sequence ---

export const getActiveSequence = state =>
  getSequencesDict(state)[getActiveSequenceId(state)];

export const getActiveSequenceMeasureCount = (state) => {
  const activeSequence = getActiveSequence(state);
  return activeSequence
    ? activeSequence.measureCount
    : 0;
};

export const getActiveSequenceNotes = state =>
  filter({
    sequenceId: getActiveSequenceId(state),
  })(getNotes(state));


// --- Tracks ---

export const getTrackById = id => state =>
  getTracksDict(state)[id];

export const getTracks = state =>
  getTracksIds(state).map(id => getTracksDict(state)[id]);

export const getDeepTracks = state =>
  getTracks(state).map(track => ({
    ...track,
    sequences: filter({ trackId: track.id })(getDeepSequences(state)),
  }));

export const getMutedTrackIds = state => compose(
  map('id'),
  filter('isMuted'),
)(getTracks(state));

export const getSoloingTrackIds = state => compose(
  map('id'),
  filter('isSoloing'),
)(getTracks(state));

export const getIsAnyTrackSoloing = state =>
  some('isSoloing')(getTracks(state));

// --- Song ---

export const getSong = state => ({
  activeSequenceId: getActiveSequenceId(state),
  bpm: getBPM(state),
  id: getId(state),
  measureCount: getMeasureCount(state),
  name: getName(state),
  notes: {
    dict: getNotesDict(state),
    ids: getNotesIds(state),
  },
  sequences: {
    dict: getSequencesDict(state),
    ids: getSequencesIds(state),
  },
  tracks: {
    dict: getTracksDict(state),
    ids: getTracksIds(state),
  },
});

export const getStringifiedSong = state => JSON.stringify(getSong(state));
