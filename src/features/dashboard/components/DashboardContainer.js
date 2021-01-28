import { connect } from 'react-redux';

import auth from '../../auth';
import shared from '../../shared';
import Dashboard from './Dashboard';

export default connect(() => ({}), {
  onLoad: shared.actions.routeDashboardLoaded,
  onSongAdd: auth.actions.songAddRequestStarted,
  onSongDelete: auth.actions.songDeleteRequestStarted,
})(Dashboard);
