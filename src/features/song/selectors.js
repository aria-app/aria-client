import { defaultTo, filter, identity, pipe, get, includes, map, some } from 'lodash/fp';
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
  get('noteDict'),
);

export const getNotesIds = pipe(
  get(NAME),
  get('noteIds'),
);

export const getSelectedNoteIds = pipe(
  get(NAME),
  get('selectedNoteIds'),
  defaultTo([]),
);

export const getSequencesDict = pipe(
  get(NAME),
  get('sequenceDict'),
);

export const getSequencesIds = pipe(
  get(NAME),
  get('sequenceIds'),
);

export const getTracksDict = pipe(
  get(NAME),
  get('trackDict'),
);

export const getTracksIds = pipe(
  get(NAME),
  get('trackIds'),
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

export const getAreSomeNotesSelected =
  pipe(
    getSelectedNoteIds,
    some(identity),
  );

const isSelectedNote = state => note =>
  pipe(
    getSelectedNoteIds,
    includes(note.id),
  )(state);

export const getSelectedNotes = state =>
  pipe(
    getActiveSequenceNotes,
    filter(isSelectedNote(state)),
  )(state);
