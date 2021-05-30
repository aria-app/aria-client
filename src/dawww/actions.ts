import { DawwwAction, DawwwNote, DawwwSong } from './types';

export const BPM_EDITED = 'BPM_EDITED';
export const CREATED_AT_EDITED = 'CREATED_AT_EDITED';
export const FOCUSED_SEQUENCE_ID_EDITED = 'FOCUSED_SEQUENCE_ID_EDITED';
export const ID_EDITED = 'ID_EDITED';
export const MEASURE_COUNT_EDITED = 'MEASURE_COUNT_EDITED';
export const NOTE_ADDED = 'NOTE_ADDED';
export const NOTE_DELETED = 'NOTE_DELETED';
export const NOTE_PLAYED = 'NOTE_PLAYED';
export const NOTE_POINT_ADDED = 'NOTE_POINT_ADDED';
export const NOTE_POINT_DELETED = 'NOTE_POINT_DELETED';
export const NOTE_POINT_X_EDITED = 'NOTE_POINT_X_EDITED';
export const NOTE_POINT_Y_EDITED = 'NOTE_POINT_Y_EDITED';
export const PART_STEP_TRIGGERED = 'PART_STEP_TRIGGERED';
export const PLAYBACK_PAUSE_REQUESTED = 'PLAYBACK_PAUSE_REQUESTED';
export const PLAYBACK_START_REQUESTED = 'PLAYBACK_START_REQUESTED';
export const PLAYBACK_STATE_SET = 'PLAYBACK_STATE_SET';
export const PLAYBACK_STOP_REQUESTED = 'PLAYBACK_STOP_REQUESTED';
export const POSITION_SET = 'POSITION_SET';
export const POSITION_SET_REQUESTED = 'POSITION_SET_REQUESTED';
export const RELEASE_ALL_REQUESTED = 'RELEASE_ALL_REQUESTED';
export const SEQUENCE_ADDED = 'SEQUENCE_ADDED';
export const SEQUENCE_DELETION_ACCEPTED = 'SEQUENCE_DELETION_ACCEPTED';
export const SEQUENCE_DELETION_REQUESTED = 'SEQUENCE_DELETION_REQUESTED';
export const SEQUENCE_MEASURE_COUNT_EDITED = 'SEQUENCE_MEASURE_COUNT_EDITED';
export const SEQUENCE_POSITION_EDITED = 'SEQUENCE_POSITION_EDITED';
export const SEQUENCE_TRACK_ID_EDITED = 'SEQUENCE_TRACK_ID_EDITED';
export const SONG_UPDATED = 'SONG_UPDATED';
export const TRACK_ADDED = 'TRACK_ADDED';
export const TRACK_DELETION_ACCEPTED = 'TRACK_DELETION_ACCEPTED';
export const TRACK_DELETION_REQUESTED = 'TRACK_DELETION_REQUESTED';
export const TRACK_IS_MUTED_EDITED = 'TRACK_IS_MUTED_EDITED';
export const TRACK_IS_SOLOING_EDITED = 'TRACK_IS_SOLOING_EDITED';
export const TRACK_VOICE_EDITED = 'TRACK_VOICE_EDITED';
export const TRACK_VOLUME_EDITED = 'TRACK_VOLUME_EDITED';
export const UNKNOWN = 'UNKNOWN';
export const UPDATED_AT_EDITED = 'UPDATED_AT_EDITED';

// To type these better, take objects instead of loose arguments
type DawwwActionCreator<TArgs = any, TPayload = any> = (
  args: TArgs,
) => DawwwAction<TPayload>;
type DawwwNoArgActionCreator = () => DawwwAction<any>;

export const bpmEdited: DawwwActionCreator = (bpm) => ({
  type: BPM_EDITED,
  payload: { bpm },
});

export const createdAtEdited: DawwwActionCreator = (createdAt) => ({
  type: CREATED_AT_EDITED,
  payload: { createdAt },
});

export const focusedSequenceIdEdited: DawwwActionCreator = (
  focusedSequenceId,
) => ({
  type: FOCUSED_SEQUENCE_ID_EDITED,
  payload: { focusedSequenceId },
});

export const idEdited: DawwwActionCreator = (id) => ({
  type: ID_EDITED,
  payload: { id },
});

export const measureCountEdited: DawwwActionCreator = (measureCount) => ({
  type: MEASURE_COUNT_EDITED,
  payload: { measureCount },
});

export const noteAdded: DawwwActionCreator<DawwwNote> = (note) => ({
  type: NOTE_ADDED,
  payload: { id: note?.id, note },
});

export const noteDeleted: DawwwActionCreator<DawwwNote> = (note) => ({
  type: NOTE_DELETED,
  payload: { id: note?.id, note },
});

export const notePlayed: DawwwActionCreator = ({
  length,
  pitch,
  position,
  time,
  trackId,
}) => ({
  type: NOTE_PLAYED,
  payload: { length, pitch, position, time, trackId },
});

export const notePointAdded: DawwwActionCreator = ({ id, index, value }) => ({
  type: NOTE_POINT_ADDED,
  payload: { id, index, value },
});

export const notePointDeleted: DawwwActionCreator = ({
  id,
  index,
  prevValue,
}) => ({
  type: NOTE_POINT_DELETED,
  payload: { id, index, prevValue },
});

export const notePointXEdited: DawwwActionCreator = ({
  id,
  index,
  prevValue,
  value,
}) => ({
  type: NOTE_POINT_X_EDITED,
  payload: { id, index, prevValue, value },
});

export const notePointYEdited: DawwwActionCreator = ({
  id,
  index,
  prevValue,
  value,
}) => ({
  type: NOTE_POINT_Y_EDITED,
  payload: { id, index, prevValue, value },
});

export const partStepTriggered: DawwwActionCreator = ({
  noteIds,
  time,
  trackId,
}) => ({
  type: PART_STEP_TRIGGERED,
  payload: { noteIds, time, trackId },
});

export const playbackPauseRequested: DawwwNoArgActionCreator = () => ({
  type: PLAYBACK_PAUSE_REQUESTED,
});

export const playbackStartRequested: DawwwNoArgActionCreator = () => ({
  type: PLAYBACK_START_REQUESTED,
});

export const playbackStateSet: DawwwActionCreator = (playbackState) => ({
  type: PLAYBACK_STATE_SET,
  payload: { playbackState },
});

export const playbackStopRequested: DawwwNoArgActionCreator = () => ({
  type: PLAYBACK_STOP_REQUESTED,
});

export const positionSet: DawwwActionCreator = (position, caller?) => ({
  type: POSITION_SET,
  payload: { position },
  meta: { caller },
});

export const positionSetRequested: DawwwActionCreator = (position) => ({
  type: POSITION_SET_REQUESTED,
  payload: { position },
});

export const releaseAllRequested: DawwwNoArgActionCreator = () => ({
  type: RELEASE_ALL_REQUESTED,
});

export const sequenceAdded: DawwwActionCreator = (sequence) => ({
  type: SEQUENCE_ADDED,
  payload: { sequence },
});

export const sequenceDeletionAccepted: DawwwActionCreator = (sequence) => ({
  type: SEQUENCE_DELETION_ACCEPTED,
  payload: { sequence },
});

export const sequenceDeletionRequested: DawwwActionCreator = (sequence) => ({
  type: SEQUENCE_DELETION_REQUESTED,
  payload: { sequence },
});

export const sequenceMeasureCountEdited: DawwwActionCreator = ({
  id,
  prevValue,
  value,
}) => ({
  type: SEQUENCE_MEASURE_COUNT_EDITED,
  payload: { id, prevValue, value },
});

export const sequencePositionEdited: DawwwActionCreator = ({
  id,
  prevValue,
  value,
}) => ({
  type: SEQUENCE_POSITION_EDITED,
  payload: { id, prevValue, value },
});

export const sequenceTrackIdEdited: DawwwActionCreator = ({
  id,
  prevValue,
  value,
}) => ({
  type: SEQUENCE_TRACK_ID_EDITED,
  payload: { id, prevValue, value },
});

export const songUpdated: DawwwActionCreator<{
  prevSong: DawwwSong;
  song: DawwwSong;
}> = ({ prevSong, song }) => ({
  type: SONG_UPDATED,
  payload: { prevSong, song },
});

export const trackAdded: DawwwActionCreator = ({
  isAnyTrackSoloing,
  track,
}) => ({
  type: TRACK_ADDED,
  payload: { isAnyTrackSoloing, track },
});

export const trackDeletionAccepted: DawwwActionCreator = (track) => ({
  type: TRACK_DELETION_ACCEPTED,
  payload: { track },
});

export const trackDeletionRequested: DawwwActionCreator = (track) => ({
  type: TRACK_DELETION_REQUESTED,
  payload: { track },
});

export const trackIsMutedEdited: DawwwActionCreator = ({
  id,
  prevValue,
  value,
}) => ({
  type: TRACK_IS_MUTED_EDITED,
  payload: { id, prevValue, value },
});

export const trackIsSoloingEdited: DawwwActionCreator = ({
  id,
  prevValue,
  value,
}) => ({
  type: TRACK_IS_SOLOING_EDITED,
  payload: { id, prevValue, value },
});

export const trackVoiceEdited: DawwwActionCreator = ({
  id,
  prevValue,
  value,
}) => ({
  type: TRACK_VOICE_EDITED,
  payload: { id, prevValue, value },
});

export const trackVolumeEdited: DawwwActionCreator = ({
  id,
  prevValue,
  value,
}) => ({
  type: TRACK_VOLUME_EDITED,
  payload: { id, prevValue, value },
});

export const updatedAtEdited: DawwwActionCreator = (updatedAt) => ({
  type: UPDATED_AT_EDITED,
  payload: { updatedAt },
});

export const unknown: DawwwNoArgActionCreator = () => ({
  type: UNKNOWN,
});
