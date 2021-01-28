import '../../audio/reducer';
import '../../song/reducer';

import { connect } from 'react-redux';

import shared from '../../shared';
import song from '../../song';
import SongViewer from './SongViewer';

export default connect(
  (state) => ({
    isLoading: song.selectors.getIsSongLoading(state),
    song: song.selectors.getSong(state),
  }),
  {
    onLoad: shared.actions.routeSongViewerLoaded,
  },
)(SongViewer);
