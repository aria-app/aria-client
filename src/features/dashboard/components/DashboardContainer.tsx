import { connect } from 'react-redux';
import shared from '../../shared';
import user from '../../user';
import Dashboard from './Dashboard';

export default connect(
  state => ({
    isLoadingSongs: user.selectors.getIsUserSongLibraryLoading(state),
    songs: user.selectors.getUserSongLibrary(state),
    user: user.selectors.getUser(state),
  }),
  {
    onLoad: shared.actions.dashboardLoaded,
    onSongAdd: shared.actions.songAddRequestStarted,
    onSongDelete: shared.actions.songDeleteRequestStarted,
  },
)(Dashboard);
