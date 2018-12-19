import { createLogic } from 'redux-logic';
import auth from '../../auth';
import shared from '../../shared';
import * as helpers from '../helpers';

export const fetchSongsForUser = createLogic({
  type: shared.actions.DASHBOARD_LOADED,
  warnTimeout: 0,
  process({ getState }, dispatch, done) {
    const user = auth.selectors.getUser(getState());

    helpers.fetchSongsByUserId(user.uid).then((songs) => {
      dispatch(shared.actions.userSongsFetched(songs));

      done();
    });
  },
});
