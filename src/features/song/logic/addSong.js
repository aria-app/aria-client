import { createLogic } from 'redux-logic';
import auth from '../../auth';
import shared from '../../shared';
import * as helpers from '../helpers';

export const addSong = createLogic({
  type: shared.actions.SONG_ADD_REQUEST_STARTED,
  warnTimeout: 0,
  process({ action, getState }, dispatch, done) {
    const user = auth.selectors.getUser(getState());

    helpers.createSong(user, action.payload.options)
      .then((song) => {
        dispatch(shared.actions.songAddRequestSucceeded(song));
        done();
      })
      .catch((error) => {
        console.error('Error while updating song: ', error);
      });
  },
});
