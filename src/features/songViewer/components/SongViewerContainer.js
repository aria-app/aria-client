import '../../audio/reducer';
import '../../song/reducer';

import { connect } from 'react-redux';

import audio from '../../audio';
import shared from '../../shared';
import song from '../../song';
import SongViewer from './SongViewer';

export default connect(
  (state) => ({
    isLoading: song.selectors.getIsSongLoading(state),
    playbackState: audio.selectors.getPlaybackState(state),
    song: song.selectors.getSong(state),
  }),
  {
    onLoad: shared.actions.routeSongViewerLoaded,
    onPause: audio.actions.playbackPauseRequestStarted,
    onPlay: audio.actions.playbackStartRequestStarted,
    onStop: audio.actions.playbackStopRequestStarted,
  },
)(SongViewer);
