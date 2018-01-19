import { NAME } from './constants';

export const BPM_MODAL_CLOSED = `${NAME}/BPM_MODAL_CLOSED`;
export const BPM_MODAL_OPENED = `${NAME}/BPM_MODAL_OPENED`;
export const BPM_SET = `${NAME}/BPM_SET`;
export const FILE_DRAG_CANCELLED = `${NAME}/FILE_DRAG_CANCELLED`;
export const FILE_DRAG_STARTED = `${NAME}/FILE_DRAG_STARTED`;
export const INITIALIZED = `${NAME}/INITIALIZED`;
export const KEY_PRESSED = `${NAME}/KEY_PRESSED`;
export const NOTE_DRAWN = `${NAME}/NOTE_DRAWN`;
export const NOTE_ERASED = `${NAME}/NOTE_ERASED`;
export const NOTE_SELECTED = `${NAME}/NOTE_SELECTED`;
export const NOTES_ALL_DESELECTED = `${NAME}/NOTES_ALL_DESELECTED`;
export const NOTES_ALL_SELECTED = `${NAME}/NOTES_ALL_SELECTED`;
export const NOTES_DRAGGED = `${NAME}/NOTES_DRAGGED`;
export const NOTES_DUPLICATED = `${NAME}/NOTES_DUPLICATED`;
export const NOTES_MOVED_OCTAVE_DOWN = `${NAME}/NOTES_MOVED_OCTAVE_DOWN`;
export const NOTES_MOVED_OCTAVE_UP = `${NAME}/NOTES_MOVED_OCTAVE_UP`;
export const NOTES_NUDGED = `${NAME}/NOTES_NUDGED`;
export const NOTES_RESIZED = `${NAME}/NOTES_RESIZED`;
export const NOTES_SELECTED_IN_AREA = `${NAME}/NOTES_SELECTED_IN_AREA`;
export const NOTES_DELETED = `${NAME}/NOTES_DELETED`;
export const PLAYBACK_PAUSE_REQUEST_STARTED = `${NAME}/PLAYBACK_PAUSE_REQUEST_STARTED`;
export const PLAYBACK_START_REQUEST_STARTED = `${NAME}/PLAYBACK_START_REQUEST_STARTED`;
export const PLAYBACK_STATE_REQUEST_SUCCEEDED = `${NAME}/PLAYBACK_STATE_REQUEST_SUCCEEDED`;
export const PLAYBACK_STOP_REQUEST_STARTED = `${NAME}/PLAYBACK_STOP_REQUEST_STARTED`;
export const POSITION_REQUEST_SUCCEEDED = `${NAME}/POSITION_REQUEST_SUCCEEDED`;
export const SEQUENCE_ADDED = `${NAME}/SEQUENCE_ADDED`;
export const SEQUENCE_CLOSED = `${NAME}/SEQUENCE_CLOSED`;
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
export const TOOL_SELECTED = `${NAME}/TOOL_SELECTED`;
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

export const keyPressed = ({ pitch, sequence }) => ({
  type: KEY_PRESSED,
  payload: {
    pitch,
    sequence,
  },
});

export const noteDrawn = ({ point, sequence }) => ({
  type: NOTE_DRAWN,
  point,
  sequence,
});

export const noteErased = ({ note }) => ({
  type: NOTE_ERASED,
  note,
});

export const noteSelected = ({ isAdditive, note }) => ({
  type: NOTE_SELECTED,
  isAdditive,
  note,
});

export const notesAllDeselected = () => ({
  type: NOTES_ALL_DESELECTED,
});

export const notesAllSelected = ({ notes }) => ({
  type: NOTES_ALL_SELECTED,
  notes,
});

export const notesDeleted = ({ notes }) => ({
  type: NOTES_DELETED,
  notes,
});

export const notesDragged = ({ notes }) => ({
  type: NOTES_DRAGGED,
  notes,
});

export const notesDuplicated = ({ notes }) => ({
  type: NOTES_DUPLICATED,
  notes,
});

export const notesMovedOctaveDown = ({ notes }) => ({
  type: NOTES_MOVED_OCTAVE_DOWN,
  notes,
});

export const notesMovedOctaveUp = ({ notes }) => ({
  type: NOTES_MOVED_OCTAVE_UP,
  notes,
});

export const notesNudged = ({ delta, notes }) => ({
  type: NOTES_NUDGED,
  delta,
  notes,
});

export const notesResized = ({ notes }) => ({
  type: NOTES_RESIZED,
  notes,
});

export const notesSelectedInArea = ({
  endPoint,
  isAdditive,
  notes,
  selectedNotes,
  startPoint,
}) => ({
  type: NOTES_SELECTED_IN_AREA,
  endPoint,
  isAdditive,
  notes,
  selectedNotes,
  startPoint,
});

export const playbackPauseRequestStarted = () => ({
  type: PLAYBACK_PAUSE_REQUEST_STARTED,
});

export const playbackStartRequestStarted = () => ({
  type: PLAYBACK_START_REQUEST_STARTED,
});

export const playbackStateRequestSucceeded = playbackState => ({
  type: PLAYBACK_STATE_REQUEST_SUCCEEDED,
  playbackState,
});

export const playbackStopRequestStarted = () => ({
  type: PLAYBACK_STOP_REQUEST_STARTED,
});

export const positionRequestSucceeded = position => ({
  type: POSITION_REQUEST_SUCCEEDED,
  position,
});

export const sequenceAdded = ({ sequence }) => ({
  type: SEQUENCE_ADDED,
  sequence,
});

export const sequenceClosed = () => ({
  type: SEQUENCE_CLOSED,
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

export const toolSelected = ({ previousToolType, toolType }) => ({
  type: TOOL_SELECTED,
  previousToolType,
  toolType,
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
