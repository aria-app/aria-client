import { connect } from 'react-redux';
import audio from '../../../audio';
import shared from '../../../shared';
import song from '../../../song';
import { TracksEditor } from './TracksEditor';

export const TracksEditorContainer = connect(state => ({
  isLoading: song.selectors.getIsSongLoading(state),
  isRedoEnabled: song.selectors.getIsRedoEnabled(state),
  isUndoEnabled: song.selectors.getIsUndoEnabled(state),
  isStopped: audio.selectors.getIsStopped(state),
  position: audio.selectors.getPosition(state),
  songMeasureCount: song.selectors.getMeasureCount(state),
  sequences: song.selectors.getSequencesArray(state),
  song: song.selectors.getSong(state),
  tracks: song.selectors.getDeepTracks(state),
}), {
  onLoad: shared.actions.songEditorLoaded,
  onPositionSet: shared.actions.positionSetRequestStarted,
  onRedo: shared.actions.redoRequested,
  onSequenceAdd: shared.actions.sequenceAdded,
  onSequenceDelete: shared.actions.sequenceDeleted,
  onSequenceDuplicate: shared.actions.sequenceDuplicated,
  onSequenceEdit: shared.actions.sequenceEdited,
  onSongMeasureCountChange: shared.actions.measureCountSet,
  onTrackAdd: shared.actions.trackAdded,
  onTrackDelete: shared.actions.trackDeleted,
  onTrackIsMutedToggle: shared.actions.trackIsMutedToggled,
  onTrackIsSoloingToggle: shared.actions.trackIsSoloingToggled,
  onTrackVoiceSet: shared.actions.trackVoiceSet,
  onTrackVolumeSet: shared.actions.trackVolumeSet,
  onUndo: shared.actions.undoRequested,
})(TracksEditor);
