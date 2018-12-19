import isEmpty from 'lodash/fp/isEmpty';
import { createLogic } from 'redux-logic';
import shared from '../../shared';
import * as helpers from '../helpers';

export const fetchSongToEdit = createLogic({
  type: shared.actions.SONG_EDITOR_LOADED,
  warnTimeout: 0,
  process({ action, getState }, dispatch, done) {
    helpers.fetchSongById(action.payload.id).then((song) => {
      if (isEmpty(song)) {
        done();
        return;
      }

      dispatch(shared.actions.songLoaded(song));

      done();
    });
  },
});
