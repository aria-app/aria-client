import { connect } from 'react-redux';
import contextMenu from 'ducks/context-menu';
import song from 'ducks/song';
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
  addSequence: actions.sequenceAddedToTrack,
  addTrack: actions.trackCreatedAndAdded,
  deselectSequence: actions.sequenceDeselected,
  openContextMenu: contextMenu.actions.contextMenuOpened,
  openSequence: song.actions.sequenceOpened,
  selectSequence: actions.sequenceSelected,
  stageTrack: actions.trackEditingStarted,
  toggleTrackIsMuted: actions.trackIsMutedToggled,
  toggleTrackIsSoloing: actions.trackIsSoloingToggled,
})(Tracks);
