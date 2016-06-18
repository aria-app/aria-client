import { connect } from 'react-redux';
import contextMenu from 'ducks/context-menu';
import song from 'ducks/song';
import { Tracks } from '../tracks/tracks';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const TracksContainer = connect((state) => ({
  mutedTrackIds: song.selectors.getMutedTrackIds(state),
  soloingTrackIds: song.selectors.getSoloingTrackIds(state),
  selectedSequenceId: selectors.getSelectedSequenceId(state),
  songMeasureCount: song.selectors.getMeasureCount(state),
  tracks: song.selectors.getDeepTracks(state),
}), {
  addSequence: song.actions.addSequenceToTrack,
  addTrack: song.actions.addNewTrack,
  deleteSequence: song.actions.deleteSequence,
  deselectSequence: actions.deselectSequence,
  openContextMenu: contextMenu.actions.contextMenuOpened,
  openSequence: song.actions.openSequence,
  selectSequence: actions.selectSequence,
  stageTrack: actions.stageTrack,
  toggleTrackIsMuted: song.actions.toggleTrackIsMuted,
  toggleTrackIsSoloing: song.actions.toggleTrackIsSoloing,
})(Tracks);
