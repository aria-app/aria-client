import { connect } from 'react-redux';
import audio from '../../../audio';
import shared from '../../../shared';
import song from '../../../song';
import * as selectors from '../../selectors';
import { Tracker } from './Tracker';

export const TrackerContainer = connect(state => ({
  isStopped: audio.selectors.getIsStopped(state),
  position: audio.selectors.getPosition(state),
  selectedSequence: selectors.getSelectedSequence(state),
  songMeasureCount: song.selectors.getMeasureCount(state),
  stagedTrack: selectors.getStagedTrack(state),
  tracks: song.selectors.getDeepTracks(state),
}), {
  onSequenceAdd: shared.actions.sequenceAdded,
  onSequenceDelete: shared.actions.sequenceDeleted,
  onSequenceDeselect: shared.actions.sequenceDeselected,
  onSequenceExtend: shared.actions.sequenceExtended,
  onSequenceMoveLeft: shared.actions.sequenceNudgedLeft,
  onSequenceMoveRight: shared.actions.sequenceNudgedRight,
  onSequenceOpen: shared.actions.sequenceOpened,
  onSequenceSelect: shared.actions.sequenceSelected,
  onSequenceShorten: shared.actions.sequenceShortened,
  onSongExtend: shared.actions.songExtended,
  onSongShorten: shared.actions.songShortened,
  onTrackAdd: shared.actions.trackAdded,
  onTrackDelete: shared.actions.trackDeleted,
  onTrackEditingFinish: shared.actions.trackEditingFinished,
  onTrackIsMutedToggle: shared.actions.trackIsMutedToggled,
  onTrackIsSoloingToggle: shared.actions.trackIsSoloingToggled,
  onTrackStage: shared.actions.trackEditingStarted,
  onTrackVoiceSet: shared.actions.trackVoiceSet,
})(Tracker);
