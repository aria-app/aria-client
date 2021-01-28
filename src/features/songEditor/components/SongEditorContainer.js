import '../../audio/reducer';
import '../../song/reducer';

import { connect } from 'react-redux';

import song from '../../song';
import SongEditor from './SongEditor';

export default connect(
  (state) => ({
    song: song.selectors.getSong(state),
  }),
  {
    onBPMChange: song.actions.bpmSet,
  },
)(SongEditor);
