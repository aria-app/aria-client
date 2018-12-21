import { createLogic } from 'redux-logic';
import shared from '../../shared';
import * as helpers from '../helpers';

export const deleteSong = createLogic({
  type: shared.actions.SONG_DELETE_REQUEST_STARTED,
  warnTimeout: 0,
  process({ action }, dispatch, done) {
    helpers.deleteSong(action.payload.song)
      .then((song) => {
        dispatch(shared.actions.songDeleteRequestSucceeded(action.payload.song));
        done();
      })
      .catch((error) => {
        console.error('Error while deleting song: ', error);
      });
  },
});
