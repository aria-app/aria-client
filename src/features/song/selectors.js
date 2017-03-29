import { defaultTo, filter, pipe, get, includes, map, some } from 'lodash/fp';
import shared from '../shared';
import { NAME } from './constants';

export const getActiveSequenceId = pipe(
  get(NAME),
  get('activeSequenceId'),
);

export const getBPM = pipe(
  get(NAME),
  get('bpm'),
  defaultTo(shared.constants.defaultBPM),
);

export const getId = pipe(
  get(NAME),
  get('id'),
  defaultTo(''),
);

export const getMeasureCount = pipe(
  get(NAME),
  get('measureCount'),
  defaultTo(1),
);

export const getName = pipe(
  get(NAME),
  get('name'),
  defaultTo(''),
);

export const getNotesDict = pipe(
  get(NAME),
  get('notes.dict'),
);

export const getNotesIds = pipe(
  get(NAME),
  get('notes.ids'),
);

export const getSequencesDict = pipe(
  get(NAME),
  get('sequences.dict'),
);

export const getSequencesIds = pipe(
  get(NAME),
  get('sequences.ids'),
);

export const getTracksDict = pipe(
  get(NAME),
  get('tracks.dict'),
);

export const getTracksIds = pipe(
  get(NAME),
  get('tracks.ids'),
);

// --- Notes ---

export const getNoteById = id => pipe(
  getNotesDict,
  get(id),
  defaultTo({}),
);

export const getNotes = state => pipe(
  getNotesIds,
  map(id => getNoteById(id)(state)),
)(state);

export const getNotesBySequenceId = sequenceId =>
  pipe(
    getNotes,
    filter({ sequenceId }),
  );

export const getNotesBySequenceIds = sequenceIds =>
  pipe(
    getNotes,
    filter(n => includes(n.sequenceId)(sequenceIds)),
  );


// --- Sequence ---

export const getSequenceById = id => pipe(
  getSequencesDict,
  get(id),
  defaultTo({}),
);

export const getSequences = state =>
  pipe(
    getSequencesIds,
    map(id => getSequenceById(id)(state)),
  )(state);

export const getSequencesByTrackId = trackId =>
  pipe(
    getSequences,
    filter({ trackId }),
  );

export const getSequencesByTrackIds = trackIds =>
  pipe(
    getSequences,
    filter(n => includes(n.trackId)(trackIds)),
  );

const getDeepSequence = state => sequence => ({
  ...sequence,
  notes: pipe(
    getNotes,
    filter({ sequenceId: sequence.id }),
  )(state),
});

export const getDeepSequences = state =>
  pipe(
    getSequences,
    map(getDeepSequence(state)),
  )(state);


// --- Active Sequence ---

export const getActiveSequence = state =>
  pipe(
    getActiveSequenceId,
    id => getSequenceById(id)(state),
  )(state);

export const getActiveSequenceMeasureCount =
  pipe(
    getActiveSequence,
    get('measureCount'),
    defaultTo(0),
  );

export const getActiveSequenceNotes = state =>
  pipe(
    getNotes,
    filter({ sequenceId: getActiveSequenceId(state) }),
  )(state);


// --- Tracks ---

export const getTrackById = id =>
  pipe(
    getTracksDict,
    get(id),
    defaultTo({}),
  );

export const getTracks = state =>
  pipe(
    getTracksIds,
    map(id => getTrackById(id)(state)),
  )(state);

const getDeepTrack = state => track => ({
  ...track,
  sequences: pipe(
    getDeepSequences,
    filter({ trackId: track.id }),
  )(state),
});

export const getDeepTracks = state =>
  pipe(
    getTracks,
    map(getDeepTrack(state)),
  )(state);

export const getMutedTrackIds =
  pipe(
    getTracks,
    filter('isMuted'),
    map('id'),
  );

export const getSoloingTrackIds =
  pipe(
    getTracks,
    filter('isSoloing'),
    map('id'),
  );

export const getIsAnyTrackSoloing =
  pipe(
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

export const getStringifiedSong = pipe(
  getSong,
  JSON.stringify,
);
