import { connect } from 'react-redux';
import contextMenu from '../../../context-menu';
import song from '../../../song';
import tracksData from '../../../tracks-data';
import * as selectors from '../../selectors';
import { Tracks } from './tracks';

// wallaby-ignore
export const TracksContainer = connect(state => ({
  mutedTrackIds: song.selectors.getMutedTrackIds(state),
  soloingTrackIds: song.selectors.getSoloingTrackIds(state),
  selectedSequenceId: selectors.getSelectedSequenceId(state),
  songMeasureCount: song.selectors.getMeasureCount(state),
  tracks: song.selectors.getDeepTracks(state),
}), {
  onSequenceAdd: tracksData.actions.sequenceAddedToTrack,
  onSequenceContextMenu: contextMenu.actions.contextMenuOpened,
  onSequenceDeselect: tracksData.actions.sequenceDeselected,
  onSequenceOpen: song.actions.sequenceOpened,
  onSequenceSelect: tracksData.actions.sequenceSelected,
  onTrackAdd: tracksData.actions.trackCreatedAndAdded,
  onTrackIsMutedToggle: tracksData.actions.trackIsMutedToggled,
  onTrackIsSoloingToggle: tracksData.actions.trackIsSoloingToggled,
  onTrackStage: tracksData.actions.trackEditingStarted,
})(Tracks);
