export const BPM_SET = 'BPM_SET';
export const DASHBOARD_LOADED = 'DASHBOARD_LOADED';
export const INITIALIZED = 'INITIALIZED';
export const MEASURE_COUNT_SET = 'MEASURE_COUNT_SET';
export const NOTE_DRAWN = 'NOTE_DRAWN';
export const NOTE_ERASED = 'NOTE_ERASED';
export const NOTES_DRAGGED = 'NOTES_DRAGGED';
export const NOTES_DUPLICATED = 'NOTES_DUPLICATED';
export const NOTES_EDITOR_LOADED = 'NOTES_EDITOR_LOADED';
export const NOTES_MOVED_OCTAVE_DOWN = 'NOTES_MOVED_OCTAVE_DOWN';
export const NOTES_MOVED_OCTAVE_UP = 'NOTES_MOVED_OCTAVE_UP';
export const NOTES_NUDGED = 'NOTES_NUDGED';
export const NOTES_RESIZED = 'NOTES_RESIZED';
export const NOTES_DELETED = 'NOTES_DELETED';
export const PLAYBACK_PAUSE_REQUEST_STARTED = 'PLAYBACK_PAUSE_REQUEST_STARTED';
export const PLAYBACK_START_REQUEST_STARTED = 'PLAYBACK_START_REQUEST_STARTED';
export const PLAYBACK_STATE_REQUEST_SUCCEEDED =
  'PLAYBACK_STATE_REQUEST_SUCCEEDED';
export const PLAYBACK_STOP_REQUEST_STARTED = 'PLAYBACK_STOP_REQUEST_STARTED';
export const POSITION_REQUEST_SUCCEEDED = 'POSITION_REQUEST_SUCCEEDED';
export const POSITION_SET_REQUEST_STARTED = 'POSITION_SET_REQUEST_STARTED';
export const REDO_REQUESTED = 'REDO_REQUESTED';
export const SEQUENCE_ADDED = 'SEQUENCE_ADDED';
export const SEQUENCE_DELETED = 'SEQUENCE_DELETED';
export const SEQUENCE_DUPLICATED = 'SEQUENCE_DUPLICATED';
export const SEQUENCE_EDITED = 'SEQUENCE_EDITED';
export const SYNC_STARTED = 'SYNC_STARTED';
export const SYNC_SUCCEEDED = 'SYNC_SUCCEEDED';
export const SONG_ADD_REQUEST_STARTED = 'SONG_ADD_REQUEST_STARTED';
export const SONG_ADD_REQUEST_SUCCEEDED = 'SONG_ADD_REQUEST_SUCCEEDED';
export const SONG_DELETE_REQUEST_STARTED = 'SONG_DELETE_REQUEST_STARTED';
export const SONG_DELETE_REQUEST_SUCCEEDED = 'SONG_DELETE_REQUEST_SUCCEEDED';
export const SONG_EDITOR_LOADED = 'SONG_EDITOR_LOADED';
export const SONG_VIEWER_LOADED = 'SONG_VIEWER_LOADED';
export const SONG_LOADED = 'SONG_LOADED';
export const TRACK_ADDED = 'TRACK_ADDED';
export const TRACK_DELETED = 'TRACK_DELETED';
export const TRACK_IS_MUTED_TOGGLED = 'TRACK_IS_MUTED_TOGGLED';
export const TRACK_IS_SOLOING_TOGGLED = 'TRACK_IS_SOLOING_TOGGLED';
export const TRACK_VOICE_SET = 'TRACK_VOICE_SET';
export const TRACK_VOLUME_SET = 'TRACK_VOLUME_SET';
export const UNDO_REQUESTED = 'UNDO_REQUESTED';
export const USER_SIGN_IN_SUCCEEDED = 'USER_SIGN_IN_SUCCEEDED';
export const USER_SIGN_OUT_SUCCEEDED = 'USER_SIGN_OUT_SUCCEEDED';
export const USER_SONG_LIBRARY_FETCH_REQUEST_SUCCEEDED =
  'USER_SONG_LIBRARY_FETCH_REQUEST_SUCCEEDED';

export const undoableActions = [
  BPM_SET,
  MEASURE_COUNT_SET,
  NOTE_DRAWN,
  NOTE_ERASED,
  NOTES_DELETED,
  NOTES_DRAGGED,
  NOTES_DUPLICATED,
  NOTES_MOVED_OCTAVE_DOWN,
  NOTES_MOVED_OCTAVE_UP,
  NOTES_NUDGED,
  NOTES_RESIZED,
  SEQUENCE_ADDED,
  SEQUENCE_DELETED,
  SEQUENCE_DUPLICATED,
  SEQUENCE_EDITED,
  TRACK_ADDED,
  TRACK_DELETED,
  TRACK_IS_MUTED_TOGGLED,
  TRACK_IS_SOLOING_TOGGLED,
  TRACK_VOICE_SET,
  TRACK_VOLUME_SET,
];

export const serverUpdatingActions = [
  BPM_SET,
  MEASURE_COUNT_SET,
  NOTE_DRAWN,
  NOTE_ERASED,
  NOTES_DELETED,
  NOTES_DRAGGED,
  NOTES_DUPLICATED,
  NOTES_MOVED_OCTAVE_DOWN,
  NOTES_MOVED_OCTAVE_UP,
  NOTES_NUDGED,
  NOTES_RESIZED,
  REDO_REQUESTED,
  SEQUENCE_ADDED,
  SEQUENCE_DELETED,
  SEQUENCE_DUPLICATED,
  SEQUENCE_EDITED,
  TRACK_ADDED,
  TRACK_DELETED,
  TRACK_IS_MUTED_TOGGLED,
  TRACK_IS_SOLOING_TOGGLED,
  TRACK_VOICE_SET,
  TRACK_VOLUME_SET,
  UNDO_REQUESTED,
];

export const dawwwUpdatingActions = [
  ...serverUpdatingActions,
  NOTES_EDITOR_LOADED,
  SONG_EDITOR_LOADED,
  SONG_VIEWER_LOADED,
];

export const bpmSet = bpm => ({
  type: BPM_SET,
  payload: {
    bpm,
  },
});

export const dashboardLoaded = () => ({
  type: DASHBOARD_LOADED,
});

export const initialized = () => ({
  type: INITIALIZED,
});

export const measureCountSet = measureCount => ({
  type: MEASURE_COUNT_SET,
  payload: {
    measureCount,
  },
});

export const noteDrawn = (point, sequence) => ({
  type: NOTE_DRAWN,
  payload: {
    point,
    sequence,
  },
});

export const noteErased = note => ({
  type: NOTE_ERASED,
  payload: {
    note,
  },
});

export const notesDeleted = notes => ({
  type: NOTES_DELETED,
  payload: {
    notes,
  },
});

export const notesDragged = notes => ({
  type: NOTES_DRAGGED,
  payload: {
    notes,
  },
});

export const notesDuplicated = notes => ({
  type: NOTES_DUPLICATED,
  payload: {
    notes,
  },
});

export const notesEditorLoaded = (songId, sequenceId) => ({
  type: NOTES_EDITOR_LOADED,
  payload: {
    sequenceId,
    songId,
  },
});

export const notesMovedOctaveDown = notes => ({
  type: NOTES_MOVED_OCTAVE_DOWN,
  payload: {
    notes,
  },
});

export const notesMovedOctaveUp = notes => ({
  type: NOTES_MOVED_OCTAVE_UP,
  payload: {
    notes,
  },
});

export const notesNudged = (delta, notes, sequence) => ({
  type: NOTES_NUDGED,
  payload: {
    delta,
    notes,
    sequence,
  },
});

export const notesResized = notes => ({
  type: NOTES_RESIZED,
  payload: {
    notes,
  },
});

export const playbackPauseRequestStarted = () => ({
  type: PLAYBACK_PAUSE_REQUEST_STARTED,
});

export const playbackStartRequestStarted = () => ({
  type: PLAYBACK_START_REQUEST_STARTED,
});

export const playbackStateRequestSucceeded = playbackState => ({
  type: PLAYBACK_STATE_REQUEST_SUCCEEDED,
  payload: {
    playbackState,
  },
});

export const playbackStopRequestStarted = () => ({
  type: PLAYBACK_STOP_REQUEST_STARTED,
});

export const positionRequestSucceeded = position => ({
  type: POSITION_REQUEST_SUCCEEDED,
  payload: {
    position,
  },
});

export const positionSetRequestStarted = position => ({
  type: POSITION_SET_REQUEST_STARTED,
  payload: {
    position,
  },
});

export const redoRequested = () => ({
  type: REDO_REQUESTED,
});

export const sequenceAdded = sequence => ({
  type: SEQUENCE_ADDED,
  payload: {
    sequence,
  },
});

export const sequenceDeleted = sequence => ({
  type: SEQUENCE_DELETED,
  payload: {
    sequence,
  },
});

export const sequenceDuplicated = (duplicatedSequence, originalSequence) => ({
  type: SEQUENCE_DUPLICATED,
  payload: {
    duplicatedSequence,
    originalSequence,
  },
});

export const sequenceEdited = sequence => ({
  type: SEQUENCE_EDITED,
  payload: {
    sequence,
  },
});

export const songAddRequestStarted = options => ({
  type: SONG_ADD_REQUEST_STARTED,
  payload: {
    options,
  },
});

export const songAddRequestSucceeded = song => ({
  type: SONG_ADD_REQUEST_SUCCEEDED,
  payload: {
    song,
  },
});

export const songDeleteRequestStarted = song => ({
  type: SONG_DELETE_REQUEST_STARTED,
  payload: {
    song,
  },
});

export const songDeleteRequestSucceeded = song => ({
  type: SONG_DELETE_REQUEST_SUCCEEDED,
  payload: {
    song,
  },
});

export const songEditorLoaded = songId => ({
  type: SONG_EDITOR_LOADED,
  payload: {
    songId,
  },
});

export const songLoaded = song => ({
  type: SONG_LOADED,
  payload: {
    song,
  },
});

export const songViewerLoaded = songId => ({
  type: SONG_VIEWER_LOADED,
  payload: {
    songId,
  },
});

export const syncStarted = () => ({
  type: SYNC_STARTED,
});

export const syncSucceeded = () => ({
  type: SYNC_SUCCEEDED,
});

export const trackAdded = (track, sequence) => ({
  type: TRACK_ADDED,
  payload: {
    sequence,
    track,
  },
});

export const trackDeleted = track => ({
  type: TRACK_DELETED,
  payload: {
    track,
  },
});

export const trackIsMutedToggled = track => ({
  type: TRACK_IS_MUTED_TOGGLED,
  payload: {
    track,
  },
});

export const trackIsSoloingToggled = track => ({
  type: TRACK_IS_SOLOING_TOGGLED,
  payload: {
    track,
  },
});

export const trackVoiceSet = (track, voice) => ({
  type: TRACK_VOICE_SET,
  payload: {
    track,
    voice,
  },
});

export const trackVolumeSet = (track, volume) => ({
  type: TRACK_VOLUME_SET,
  payload: {
    track,
    volume,
  },
});

export const undoRequested = () => ({
  type: UNDO_REQUESTED,
});

export const userSignInSucceeded = user => ({
  type: USER_SIGN_IN_SUCCEEDED,
  payload: {
    user,
  },
});

export const userSignOutSucceeded = () => ({
  type: USER_SIGN_OUT_SUCCEEDED,
});

export const userSongLibraryFetchRequestSucceeded = userSongLibrary => ({
  type: USER_SONG_LIBRARY_FETCH_REQUEST_SUCCEEDED,
  payload: {
    userSongLibrary,
  },
});
