import { connect } from 'react-redux';
import audio from '../../../audio';
import location from '../../../location';
import shared from '../../../shared';
import song from '../../../song';
import { Tracker } from './Tracker';

export const TrackerContainer = connect(state => ({
  bpm: song.selectors.getBPM(state),
  isRedoEnabled: song.selectors.getIsRedoEnabled(state),
  isUndoEnabled: song.selectors.getIsUndoEnabled(state),
  isStopped: audio.selectors.getIsStopped(state),
  position: audio.selectors.getPosition(state),
  songMeasureCount: song.selectors.getMeasureCount(state),
  sequenceMap: song.selectors.getSequences(state),
  song: song.selectors.getSong(state),
  trackMap: song.selectors.getTracks(state),
  trackToEditId: location.selectors.getTrackToEditId(state),
  tracks: song.selectors.getDeepTracks(state),
}), {
  onBPMChange: shared.actions.bpmSet,
  onPositionSet: shared.actions.positionSetRequestStarted,
  onRedo: shared.actions.redoRequested,
  onSequenceAdd: shared.actions.sequenceAdded,
  onSequenceDelete: shared.actions.sequenceDeleted,
  onSequenceDuplicate: shared.actions.sequenceDuplicated,
  onSequenceEdit: shared.actions.sequenceEdited,
  onSequenceExtend: shared.actions.sequenceExtended,
  onSequenceMoveLeft: shared.actions.sequenceNudgedLeft,
  onSequenceMoveRight: shared.actions.sequenceNudgedRight,
  onSequenceOpen: shared.actions.sequencerLoaded,
  onSequenceShorten: shared.actions.sequenceShortened,
  onSongExtend: shared.actions.songExtended,
  onSongMeasureCountChange: shared.actions.measureCountSet,
  onSongShorten: shared.actions.songShortened,
  onTrackAdd: shared.actions.trackAdded,
  onTrackEditingFinish: shared.actions.trackerLoaded,
  onTrackEditingStart: shared.actions.editTrackLoaded,
  onTrackDelete: shared.actions.trackDeleted,
  onTrackIsMutedToggle: shared.actions.trackIsMutedToggled,
  onTrackIsSoloingToggle: shared.actions.trackIsSoloingToggled,
  onTrackVoiceSet: shared.actions.trackVoiceSet,
  onTrackVolumeSet: shared.actions.trackVolumeSet,
  onUndo: shared.actions.undoRequested,
})(Tracker);
