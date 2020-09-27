import { connect } from 'react-redux';
import audio from '../../audio';
import '../../audio/reducer';
import song from '../../song';
import '../../song/reducer';
import user from '../../user';
import SongEditor from './SongEditor';

export default connect(
  state => ({
    playbackState: audio.selectors.getPlaybackState(state),
    song: song.selectors.getSong(state),
    user: user.selectors.getUser(state),
  }),
  {
    onBPMChange: song.actions.bpmSet,
    onPause: audio.actions.playbackPauseRequestStarted,
    onPlay: audio.actions.playbackStartRequestStarted,
    onStop: audio.actions.playbackStopRequestStarted,
  },
)(SongEditor);
