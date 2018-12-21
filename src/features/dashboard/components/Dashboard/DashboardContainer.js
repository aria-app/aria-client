import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import auth from '../../../auth';
import shared from '../../../shared';
import song from '../../../song';
import { Dashboard } from './Dashboard';

export const DashboardContainer = withRouter(connect(state => ({
  songs: song.selectors.getSongs(state),
  user: auth.selectors.getUser(state),
}), {
  onLoad: shared.actions.dashboardLoaded,
  onSongAdd: shared.actions.songAddRequestStarted,
})(Dashboard));
