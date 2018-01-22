import * as helpers from './helpers';

export const BPM_SET = 'BPM_SET';
export const INITIALIZED = 'INITIALIZED';
export const KEY_PRESSED = 'KEY_PRESSED';
export const NOTE_DRAWN = 'NOTE_DRAWN';
export const NOTE_ERASED = 'NOTE_ERASED';
export const NOTES_DRAGGED = 'NOTES_DRAGGED';
export const NOTES_DUPLICATED = 'NOTES_DUPLICATED';
export const NOTES_MOVED_OCTAVE_DOWN = 'NOTES_MOVED_OCTAVE_DOWN';
export const NOTES_MOVED_OCTAVE_UP = 'NOTES_MOVED_OCTAVE_UP';
export const NOTES_NUDGED = 'NOTES_NUDGED';
export const NOTES_RESIZED = 'NOTES_RESIZED';
export const NOTES_DELETED = 'NOTES_DELETED';
export const PLAYBACK_PAUSE_REQUEST_STARTED = 'PLAYBACK_PAUSE_REQUEST_STARTED';
export const PLAYBACK_START_REQUEST_STARTED = 'PLAYBACK_START_REQUEST_STARTED';
export const PLAYBACK_STATE_REQUEST_SUCCEEDED = 'PLAYBACK_STATE_REQUEST_SUCCEEDED';
export const PLAYBACK_STOP_REQUEST_STARTED = 'PLAYBACK_STOP_REQUEST_STARTED';
export const POSITION_REQUEST_SUCCEEDED = 'POSITION_REQUEST_SUCCEEDED';
export const SEQUENCE_ADDED = 'SEQUENCE_ADDED';
export const SEQUENCE_CLOSED = 'SEQUENCE_CLOSED';
export const SEQUENCE_DELETED = 'SEQUENCE_DELETED';
export const SEQUENCE_DESELECTED = 'SEQUENCE_DESELECTED';
export const SEQUENCE_EXTENDED = 'SEQUENCE_EXTENDED';
export const SEQUENCE_NUDGED_LEFT = 'SEQUENCE_NUDGED_LEFT';
export const SEQUENCE_NUDGED_RIGHT = 'SEQUENCE_NUDGED_RIGHT';
export const SEQUENCE_OPENED = 'SEQUENCE_OPENED';
export const SEQUENCE_SELECTED = 'SEQUENCE_SELECTED';
export const SEQUENCE_SHORTENED = 'SEQUENCE_SHORTENED';
export const SONG_EXTENDED = 'SONG_EXTENDED';
export const SONG_LOADED = 'SONG_LOADED';
export const SONG_SHORTENED = 'SONG_SHORTENED';
export const TRACK_ADDED = 'TRACK_ADDED';
export const TRACK_DELETED = 'TRACK_DELETED';
export const TRACK_EDITING_FINISHED = 'TRACK_EDITING_FINISHED';
export const TRACK_EDITING_STARTED = 'TRACK_EDITING_STARTED';
export const TRACK_IS_MUTED_TOGGLED = 'TRACK_IS_MUTED_TOGGLED';
export const TRACK_IS_SOLOING_TOGGLED = 'TRACK_IS_SOLOING_TOGGLED';
export const TRACK_VOICE_SET = 'TRACK_VOICE_SET';

export const bpmSet = bpm => ({
  type: BPM_SET,
  payload: {
    bpm,
  },
});

export const initialized = () => ({
  type: INITIALIZED,
});

export const keyPressed = (pitch, sequence) => ({
  type: KEY_PRESSED,
  payload: {
    pitch,
    sequence,
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

export const notesNudged = (delta, notes) => ({
  type: NOTES_NUDGED,
  payload: {
    delta,
    notes,
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

export const sequenceAdded = (track, position) => ({
  type: SEQUENCE_ADDED,
  payload: {
    sequence: helpers.createSequence(track.id, position),
  },
});

export const sequenceClosed = () => ({
  type: SEQUENCE_CLOSED,
});

export const sequenceDeleted = sequence => ({
  type: SEQUENCE_DELETED,
  payload: {
    sequence,
  },
});

export const sequenceDeselected = () => ({
  type: SEQUENCE_DESELECTED,
});

export const sequenceExtended = sequence => ({
  type: SEQUENCE_EXTENDED,
  payload: {
    sequence,
  },
});

export const songLoaded = song => ({
  type: SONG_LOADED,
  payload: {
    song,
  },
});

export const sequenceNudgedLeft = sequence => ({
  type: SEQUENCE_NUDGED_LEFT,
  payload: {
    sequence,
  },
});

export const sequenceNudgedRight = sequence => ({
  type: SEQUENCE_NUDGED_RIGHT,
  payload: {
    sequence,
  },
});

export const sequenceOpened = sequence => ({
  type: SEQUENCE_OPENED,
  payload: {
    sequence,
  },
});

export const sequenceSelected = sequence => ({
  type: SEQUENCE_SELECTED,
  payload: {
    sequence,
  },
});

export const sequenceShortened = sequence => ({
  type: SEQUENCE_SHORTENED,
  payload: {
    sequence,
  },
});

export const songExtended = () => ({
  type: SONG_EXTENDED,
});

export const songShortened = () => ({
  type: SONG_SHORTENED,
});

export const trackAdded = () => {
  const track = helpers.createTrack();

  return {
    type: TRACK_ADDED,
    payload: {
      sequence: helpers.createSequence(track.id),
      track,
    },
  };
};

export const trackDeleted = track => ({
  type: TRACK_DELETED,
  payload: {
    track,
  },
});

export const trackEditingFinished = () => ({
  type: TRACK_EDITING_FINISHED,
});

export const trackEditingStarted = track => ({
  type: TRACK_EDITING_STARTED,
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
