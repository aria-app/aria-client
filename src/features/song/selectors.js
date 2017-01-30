import { filter, flow, get, getOr, includes, map, some } from 'lodash/fp';
import shared from '../shared';
import { NAME } from './constants';

export const getActiveSequenceId = state =>
  get('activeSequenceId')(state[NAME]);

export const getBPM = state =>
  getOr(shared.constants.defaultBPM)('bpm')(state[NAME]);

export const getId = state =>
  getOr('')('id')(state[NAME]);

export const getMeasureCount = state =>
  getOr(1)('measureCount')(state[NAME]);

export const getName = state =>
  getOr('')('name')(state[NAME]);

export const getNotesDict = state =>
  get('notes.dict')(state[NAME]);

export const getNotesIds = state =>
  get('notes.ids')(state[NAME]);

export const getSequencesDict = state =>
  get('sequences.dict')(state[NAME]);

export const getSequencesIds = state =>
  get('sequences.ids')(state[NAME]);

export const getTracksDict = state =>
  get('tracks.dict')(state[NAME]);

export const getTracksIds = state =>
  get('tracks.ids')(state[NAME]);


// --- Notes ---

export const getNoteById = id =>
  flow(
    getNotesDict,
    getOr({})(id),
  );

export const getNotes = state =>
  flow(
    getNotesIds,
    map(id => getNoteById(id)(state)),
  )(state);

export const getNotesBySequenceId = sequenceId =>
  flow(
    getNotes,
    filter({ sequenceId }),
  );

export const getNotesBySequenceIds = sequenceIds =>
  flow(
    getNotes,
    filter(n => includes(n.sequenceId)(sequenceIds)),
  );


// --- Sequence ---

export const getSequenceById = id => flow(
  getSequencesDict,
  getOr({})(id),
);

export const getSequences = state =>
  flow(
    getSequencesIds,
    map(id => getSequenceById(id)(state)),
  )(state);

export const getSequencesByTrackId = trackId =>
  flow(
    getSequences,
    filter({ trackId }),
  );

export const getSequencesByTrackIds = trackIds =>
  flow(
    getSequences,
    filter(n => includes(n.trackId)(trackIds)),
  );

const getDeepSequence = state => sequence => ({
  ...sequence,
  notes: flow(
    getNotes,
    filter({ sequenceId: sequence.id }),
  )(state),
});

export const getDeepSequences = state =>
  flow(
    getSequences,
    map(getDeepSequence(state)),
  )(state);


// --- Active Sequence ---

export const getActiveSequence = state =>
  flow(
    getActiveSequenceId,
    id => getSequenceById(id)(state),
  )(state);

export const getActiveSequenceMeasureCount =
  flow(
    getActiveSequence,
    getOr(0)('measureCount'),
  );

export const getActiveSequenceNotes = state =>
  flow(
    getNotes,
    filter({ sequenceId: getActiveSequenceId(state) }),
  )(state);


// --- Tracks ---

export const getTrackById = id =>
  flow(
    getTracksDict,
    getOr({})(id),
  );

export const getTracks = state =>
  flow(
    getTracksIds,
    map(id => getTrackById(id)(state)),
  )(state);

const getDeepTrack = state => track => ({
  ...track,
  sequences: flow(
    getDeepSequences,
    filter({ trackId: track.id }),
  )(state),
});

export const getDeepTracks = state =>
  flow(
    getTracks,
    map(getDeepTrack(state)),
  )(state);

export const getMutedTrackIds =
  flow(
    getTracks,
    filter('isMuted'),
    map('id'),
  );

export const getSoloingTrackIds =
  flow(
    getTracks,
    filter('isSoloing'),
    map('id'),
  );

export const getIsAnyTrackSoloing =
  flow(
    getTracks,
    some('isSoloing'),
  );

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
