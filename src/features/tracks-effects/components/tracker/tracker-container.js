import { connect } from 'react-redux';
import contextMenu from '../../../context-menu';
import song from '../../../song';
import tracksData from '../../../tracks-data';
import * as selectors from '../../selectors';
import { Tracker } from './tracker';

export const TrackerContainer = connect(state => ({
  mutedTrackIds: song.selectors.getMutedTrackIds(state),
  soloingTrackIds: song.selectors.getSoloingTrackIds(state),
  selectedSequence: selectors.getSelectedSequence(state),
  selectedSequenceId: selectors.getSelectedSequenceId(state),
  songMeasureCount: song.selectors.getMeasureCount(state),
  stagedTrack: selectors.getStagedTrack(state),
  stagedTrackSequences: selectors.getStagedTrackSequences(state),
  tracks: song.selectors.getDeepTracks(state),
}), {
  onSequenceAdd: tracksData.actions.sequenceAdded,
  onSequenceContextMenu: contextMenu.actions.contextMenuOpened,
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
  onTrackSynthTypeSet: tracksData.actions.trackSynthTypeSet,
})(Tracker);