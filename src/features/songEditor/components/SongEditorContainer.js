import '../../audio/reducer';
import '../../song/reducer';

import { connect } from 'react-redux';

import audio from '../../audio';
import song from '../../song';
import user from '../../user';
import SongEditor from './SongEditor';

export default connect(
  (state) => ({
    playbackState: audio.selectors.getPlaybackState(state),
    song: song.selectors.getSong(state),
    user: user.selectors.getUser(state),
  }),
  {
    onBPMChange: song.actions.bpmSet,
  },
)(SongEditor);
