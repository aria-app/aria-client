import { connect } from 'react-redux';
import song from '../../../song';
import audioClientData from '../../../audio-client-data';
import tracksData from '../../../tracks-data';
import * as selectors from '../../selectors';
import { Tracker } from './tracker';

export const TrackerContainer = connect(state => ({
  isStopped: audioClientData.selectors.getIsStopped(state),
  mutedTrackIds: song.selectors.getMutedTrackIds(state),
  position: audioClientData.selectors.getPosition(state),
  soloingTrackIds: song.selectors.getSoloingTrackIds(state),
  selectedSequence: selectors.getSelectedSequence(state),
  selectedSequenceId: tracksData.selectors.getSelectedSequenceId(state),
  songMeasureCount: song.selectors.getMeasureCount(state),
  stagedTrack: selectors.getStagedTrack(state),
  stagedTrackSequences: selectors.getStagedTrackSequences(state),
  tracks: song.selectors.getDeepTracks(state),
}), {
  onSequenceAdd: tracksData.actions.sequenceAdded,
  onSequenceDelete: tracksData.actions.sequenceDeleted,
  onSequenceDeselect: tracksData.actions.sequenceDeselected,
  onSequenceExtend: tracksData.actions.sequenceExtended,
  onSequenceMoveLeft: tracksData.actions.sequenceNudgedLeft,
  onSequenceMoveRight: tracksData.actions.sequenceNudgedRight,
  onSequenceOpen: tracksData.actions.sequenceOpened,
  onSequenceSelect: tracksData.actions.sequenceSelected,
  onSequenceShorten: tracksData.actions.sequenceShortened,
  onSongExtend: tracksData.actions.songExtended,
  onSongShorten: tracksData.actions.songShortened,
  onTrackAdd: tracksData.actions.trackAdded,
  onTrackDelete: tracksData.actions.trackDeleted,
  onTrackEditingFinish: tracksData.actions.trackEditingFinished,
  onTrackIsMutedToggle: tracksData.actions.trackIsMutedToggled,
  onTrackIsSoloingToggle: tracksData.actions.trackIsSoloingToggled,
  onTrackStage: tracksData.actions.trackEditingStarted,
  onTrackVoiceSet: tracksData.actions.trackVoiceSet,
})(Tracker);
