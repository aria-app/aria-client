import { connect } from 'react-redux';
import song from 'ducks/song';
import { Tracks } from '../tracks/tracks';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const TracksContainer = connect((state) => ({
  selectedSequenceId: selectors.getSelectedSequenceId(state),
  songMeasureCount: song.selectors.getMeasureCount(state),
  tracks: song.selectors.getDeepTracks(state),
}), {
  addTrack: song.actions.addNewTrack,
  deselectSequence: actions.deselectSequence,
  selectSequence: actions.selectSequence,
  stageTrack: actions.stageTrack,
})(Tracks);
