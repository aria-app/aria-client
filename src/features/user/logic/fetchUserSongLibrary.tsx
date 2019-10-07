import { createLogic } from 'redux-logic';
import shared from '../../shared';
import * as selectors from '../selectors';

const { db } = shared.constants;

export const fetchUserSongLibrary = createLogic({
  type: shared.actions.DASHBOARD_LOADED,
  warnTimeout: 0,
  process({ getState }, dispatch, done) {
    const user = selectors.getUser(getState());

    db.collection('songs')
      .where('userId', '==', user.uid)
      .get()
      .then(querySnapshot => {
        const userSongLibrary = querySnapshot.docs.map(doc => doc.data());

        dispatch(
          shared.actions.userSongLibraryFetchRequestSucceeded(userSongLibrary),
        );

        done();
      });
  },
});
