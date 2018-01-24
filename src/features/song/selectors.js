import defaultTo from 'lodash/fp/defaultTo';
import filter from 'lodash/fp/filter';
import pipe from 'lodash/fp/pipe';
import get from 'lodash/fp/get';
import map from 'lodash/fp/map';
import location from '../location';
import { NAME } from './constants';

export const getBPM = pipe(
  get(NAME),
  get('bpm'),
  defaultTo(0),
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

export const getNotes = pipe(
  get(NAME),
  get('notes'),
);

export const getSequences = pipe(
  get(NAME),
  get('sequences'),
);

export const getTracks = pipe(
  get(NAME),
  get('tracks'),
);

// --- Notes ---

export const getNoteById = id => pipe(
  getNotes,
  get(id),
  defaultTo({}),
);

export const getNotesArray = state => pipe(
  getNotes,
  Object.keys,
  map(id => getNoteById(id)(state)),
)(state);

// --- Sequence ---

export const getSequenceById = id => pipe(
  getSequences,
  get(id),
  defaultTo({}),
);

export const getSequencesArray = state =>
  pipe(
    getSequences,
    Object.keys,
    map(id => getSequenceById(id)(state)),
  )(state);

const getDeepSequence = state => sequence => ({
  ...sequence,
  notes: pipe(
    getNotesArray,
    filter({ sequenceId: sequence.id }),
  )(state),
});

export const getDeepSequences = state =>
  pipe(
    getSequencesArray,
    map(getDeepSequence(state)),
  )(state);


// --- Active Sequence ---

export const getActiveSequence = state =>
  pipe(
    location.selectors.getSequenceId,
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
    getNotesArray,
    filter({ sequenceId: location.selectors.getSequenceId(state) }),
  )(state);


// --- Tracks ---

export const getTrackById = id =>
  pipe(
    getTracks,
    get(id),
    defaultTo({}),
  );

export const getTracksArray = state =>
  pipe(
    getTracks,
    Object.keys,
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
    getTracksArray,
    map(getDeepTrack(state)),
  )(state);

// --- Song ---

export const getSong = state => ({
  bpm: getBPM(state),
  id: getId(state),
  measureCount: getMeasureCount(state),
  name: getName(state),
  notes: getNotes(state),
  sequences: getSequences(state),
  tracks: getTracks(state),
});

export const getStringifiedSong = pipe(
  getSong,
  JSON.stringify,
);
