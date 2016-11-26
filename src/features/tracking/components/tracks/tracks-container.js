import { connect } from 'react-redux';
import contextMenu from '../../../context-menu';
import song from '../../../song';
import { Tracks } from '../tracks/tracks';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const TracksContainer = connect(state => ({
  mutedTrackIds: song.selectors.getMutedTrackIds(state),
  soloingTrackIds: song.selectors.getSoloingTrackIds(state),
  selectedSequenceId: selectors.getSelectedSequenceId(state),
  songMeasureCount: song.selectors.getMeasureCount(state),
  tracks: song.selectors.getDeepTracks(state),
}), {
  onSequenceAdd: actions.sequenceAddedToTrack,
  onSequenceContextMenu: contextMenu.actions.contextMenuOpened,
  onSequenceDeselect: actions.sequenceDeselected,
  onSequenceOpen: song.actions.sequenceOpened,
  onSequenceSelect: actions.sequenceSelected,
  onTrackAdd: actions.trackCreatedAndAdded,
  onTrackIsMutedToggle: actions.trackIsMutedToggled,
  onTrackIsSoloingToggle: actions.trackIsSoloingToggled,
  onTrackStage: actions.trackEditingStarted,
})(Tracks);
