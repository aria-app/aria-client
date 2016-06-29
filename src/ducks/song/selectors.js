import _ from 'lodash';
import transport from 'ducks/transport';
import { NAME } from './constants';

const get = state => state[NAME];

export const getActiveSequenceId = state => get(state).activeSequenceId;
export const getBPM = state => get(state).bpm || transport.constants.defaultBPM;
export const getId = state => get(state).id;
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
  _.filter(getNotes(state), { sequenceId });

export const getNotesBySequenceIds = sequenceIds => state =>
  getNotes(state).filter(n => _.includes(sequenceIds, n.sequenceId));


// --- Sequence ---

export const getSequenceById = id => state =>
  getSequencesDict(state)[id];

export const getSequences = state =>
  getSequencesIds(state).map(id => getSequencesDict(state)[id]);

export const getSequencesByTrackId = trackId => state =>
  _.filter(getSequences(state), { trackId });

export const getDeepSequences = state =>
  getSequences(state).map(sequence => ({
    ...sequence,
    notes: _.filter(getNotes(state), { sequenceId: sequence.id }),
  }));


// --- Active Sequence ---

export const getActiveSequence = state =>
  getSequencesDict(state)[getActiveSequenceId(state)];

export const getActiveSequenceMeasureCount = state => {
  const activeSequence = getActiveSequence(state);
  return activeSequence
    ? activeSequence.measureCount
    : 0;
};

export const getActiveSequenceNotes = state =>
  _.filter(getNotes(state), { sequenceId: getActiveSequenceId(state) });


// --- Tracks ---

export const getTrackById = id => state =>
  getTracksDict(state)[id];

export const getTracks = state =>
  getTracksIds(state).map(id => getTracksDict(state)[id]);

export const getDeepTracks = state =>
  getTracks(state).map(track => ({
    ...track,
    sequences: _.filter(getDeepSequences(state), { trackId: track.id }),
  }));

export const getMutedTrackIds = state => _(getTracks(state))
  .filter({ isMuted: true })
  .map('id')
  .value();

export const getSoloingTrackIds = state => _(getTracks(state))
  .filter({ isSoloing: true })
  .map('id')
  .value();

export const getIsAnyTrackSoloing = state =>
  _.some(getTracks(state), 'isSoloing');

// --- Song ---

export const getSong = state => ({
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
