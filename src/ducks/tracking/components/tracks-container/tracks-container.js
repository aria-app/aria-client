import { connect } from 'react-redux';
import song from 'ducks/song';
import { Tracks } from '../tracks/tracks';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const TracksContainer = connect((state) => ({
  selectedSequenceId: selectors.getSelectedSequenceId(state),
  songMeasureCount: song.selectors.getSongMeasureCount(state),
  tracks: song.selectors.getTracksWithSequences(state),
}), {
  setSelectedSequenceId: actions.setSelectedSequenceId,
  stageTrack: actions.stageTrack,
})(Tracks);
