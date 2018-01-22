import { connect } from 'react-redux';
import audio from '../../../audio';
import shared from '../../../shared';
import song from '../../../song';
import { Tracker } from './Tracker';

export const TrackerContainer = connect(state => ({
  isStopped: audio.selectors.getIsStopped(state),
  position: audio.selectors.getPosition(state),
  songMeasureCount: song.selectors.getMeasureCount(state),
  sequenceMap: song.selectors.getSequences(state),
  trackMap: song.selectors.getTracks(state),
  tracks: song.selectors.getDeepTracks(state),
}), {
  onSequenceAdd: shared.actions.sequenceAdded,
  onSequenceDelete: shared.actions.sequenceDeleted,
  onSequenceExtend: shared.actions.sequenceExtended,
  onSequenceMoveLeft: shared.actions.sequenceNudgedLeft,
  onSequenceMoveRight: shared.actions.sequenceNudgedRight,
  onSequenceOpen: shared.actions.sequenceOpened,
  onSequenceShorten: shared.actions.sequenceShortened,
  onSongExtend: shared.actions.songExtended,
  onSongShorten: shared.actions.songShortened,
  onTrackAdd: shared.actions.trackAdded,
  onTrackDelete: shared.actions.trackDeleted,
  onTrackIsMutedToggle: shared.actions.trackIsMutedToggled,
  onTrackIsSoloingToggle: shared.actions.trackIsSoloingToggled,
  onTrackVoiceSet: shared.actions.trackVoiceSet,
})(Tracker);
