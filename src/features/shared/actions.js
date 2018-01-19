import { NAME } from './constants';

export const BPM_MODAL_CLOSED = `${NAME}/BPM_MODAL_CLOSED`;
export const BPM_MODAL_OPENED = `${NAME}/BPM_MODAL_OPENED`;
export const BPM_SET = `${NAME}/BPM_SET`;
export const FILE_DRAG_CANCELLED = `${NAME}/FILE_DRAG_CANCELLED`;
export const FILE_DRAG_STARTED = `${NAME}/FILE_DRAG_STARTED`;
export const INITIALIZED = `${NAME}/INITIALIZED`;
export const PLAYBACK_PAUSE_REQUESTED = `${NAME}/PLAYBACK_PAUSE_REQUESTED`;
export const PLAYBACK_START_REQUESTED = `${NAME}/PLAYBACK_START_REQUESTED`;
export const PLAYBACK_STOP_REQUESTED = `${NAME}/PLAYBACK_STOP_REQUESTED`;
export const SEQUENCE_ADDED = `${NAME}/SEQUENCE_ADDED`;
export const SEQUENCE_DELETED = `${NAME}/SEQUENCE_DELETED`;
export const SEQUENCE_DESELECTED = `${NAME}/SEQUENCE_DESELECTED`;
export const SEQUENCE_EXTENDED = `${NAME}/SEQUENCE_EXTENDED`;
export const SEQUENCE_NUDGED_LEFT = `${NAME}/SEQUENCE_NUDGED_LEFT`;
export const SEQUENCE_NUDGED_RIGHT = `${NAME}/SEQUENCE_NUDGED_RIGHT`;
export const SEQUENCE_OPENED = `${NAME}/SEQUENCE_OPENED`;
export const SEQUENCE_SELECTED = `${NAME}/SEQUENCE_SELECTED`;
export const SEQUENCE_SHORTENED = `${NAME}/SEQUENCE_SHORTENED`;
export const SONG_EXTENDED = `${NAME}/SONG_EXTENDED`;
export const SONG_LOADED = `${NAME}/SONG_LOADED`;
export const SONG_SHORTENED = `${NAME}/SONG_SHORTENED`;
export const TRACK_ADDED = `${NAME}/TRACK_ADDED`;
export const TRACK_DELETED = `${NAME}/TRACK_DELETED`;
export const TRACK_EDITING_FINISHED = `${NAME}/TRACK_EDITING_FINISHED`;
export const TRACK_EDITING_STARTED = `${NAME}/TRACK_EDITING_STARTED`;
export const TRACK_IS_MUTED_TOGGLED = `${NAME}/TRACK_IS_MUTED_TOGGLED`;
export const TRACK_IS_SOLOING_TOGGLED = `${NAME}/TRACK_IS_SOLOING_TOGGLED`;
export const TRACK_VOICE_SET = `${NAME}/TRACK_VOICE_SET`;

export const bpmModalClosed = () => ({
  type: BPM_MODAL_CLOSED,
});

export const bpmModalOpened = () => ({
  type: BPM_MODAL_OPENED,
});

export const bpmSet = ({ bpm }) => ({
  type: BPM_SET,
  bpm,
});

export const fileDragCancelled = () => ({
  type: FILE_DRAG_CANCELLED,
});

export const fileDragStarted = () => ({
  type: FILE_DRAG_STARTED,
});

export const initialized = () => ({
  type: INITIALIZED,
});

export const playbackPauseRequested = () => ({
  type: PLAYBACK_PAUSE_REQUESTED,
});

export const playbackStartRequested = () => ({
  type: PLAYBACK_START_REQUESTED,
});

export const playbackStopRequested = () => ({
  type: PLAYBACK_STOP_REQUESTED,
});

export const sequenceAdded = ({ sequence }) => ({
  type: SEQUENCE_ADDED,
  sequence,
});

export const sequenceDeleted = ({ sequence }) => ({
  type: SEQUENCE_DELETED,
  sequence,
});

export const sequenceDeselected = () => ({
  type: SEQUENCE_DESELECTED,
});

export const sequenceExtended = ({ sequence }) => ({
  type: SEQUENCE_EXTENDED,
  sequence,
});

export const songLoaded = ({ song }) => ({
  type: SONG_LOADED,
  song,
});

export const sequenceNudgedLeft = ({ sequence }) => ({
  type: SEQUENCE_NUDGED_LEFT,
  sequence,
});

export const sequenceNudgedRight = ({ sequence }) => ({
  type: SEQUENCE_NUDGED_RIGHT,
  sequence,
});

export const sequenceOpened = ({ sequence }) => ({
  type: SEQUENCE_OPENED,
  sequence,
});

export const sequenceSelected = ({ sequence }) => ({
  type: SEQUENCE_SELECTED,
  sequence,
});

export const sequenceShortened = ({ sequence }) => ({
  type: SEQUENCE_SHORTENED,
  sequence,
});

export const songExtended = () => ({
  type: SONG_EXTENDED,
});

export const songShortened = () => ({
  type: SONG_SHORTENED,
});

export const trackAdded = ({ sequence, track }) => ({
  type: TRACK_ADDED,
  sequence,
  track,
});

export const trackDeleted = ({ track }) => ({
  type: TRACK_DELETED,
  track,
});

export const trackEditingFinished = () => ({
  type: TRACK_EDITING_FINISHED,
});

export const trackEditingStarted = ({ track }) => ({
  type: TRACK_EDITING_STARTED,
  track,
});

export const trackIsMutedToggled = ({ track }) => ({
  type: TRACK_IS_MUTED_TOGGLED,
  track,
});

export const trackIsSoloingToggled = ({ track }) => ({
  type: TRACK_IS_SOLOING_TOGGLED,
  track,
});

export const trackVoiceSet = ({ track, voice }) => ({
  type: TRACK_VOICE_SET,
  track,
  voice,
});
