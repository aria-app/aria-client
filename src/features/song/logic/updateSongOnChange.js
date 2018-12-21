import throttle from 'lodash/fp/throttle';
import { createLogic } from 'redux-logic';
import shared from '../../shared';
import * as helpers from '../helpers';
import * as selectors from '../selectors';

const throttledUpdate = throttle(500, (song) => helpers.updateSong(song));

export const updateSongOnChange = createLogic({
  type: shared.actions.serverUpdatingActions,
  warnTimeout: 0,
  process({ action, getState }, dispatch, done) {
    const song = selectors.getSong(getState());

    dispatch(shared.actions.syncStarted());

    throttledUpdate(song)
      .then(() => {
        dispatch(shared.actions.syncSucceeded());
        done();
      })
      .catch((error) => {
        console.error('Error while updating song: ', error);
      });
  },
});
