import { connect } from 'react-redux';
import audio from '../../audio';
import shared from '../../shared';
import song from '../../song';
import SongEditor from './SongEditor';

export default connect(
  state => ({
    bpm: song.selectors.getBPM(state),
    playbackState: audio.selectors.getPlaybackState(state),
    song: song.selectors.getSong(state),
  }),
  {
    onBPMChange: shared.actions.bpmSet,
    onPause: shared.actions.playbackPauseRequestStarted,
    onPlay: shared.actions.playbackStartRequestStarted,
    onStop: shared.actions.playbackStopRequestStarted,
  },
)(SongEditor);
