import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import { createLogic, Logic } from 'redux-logic';
import shared from '../../shared';
import { fetchSongById } from '../helpers';
import * as selectors from '../selectors';

interface Payload {
  songId?: string;
}

interface Action {
  type?: string;
  payload?: Payload;
}

interface Dependencies {
  action?: Action;
  [key: string]: any;
}

type LogicType = Logic<any, Payload, any, Dependencies, any, string>;

export const fetchSong: LogicType = createLogic({
  type: [
    shared.actions.NOTES_EDITOR_LOADED,
    shared.actions.SONG_EDITOR_LOADED,
    shared.actions.SONG_VIEWER_LOADED,
  ],
  warnTimeout: 0,
  process({ action, getState }, dispatch, done) {
    fetchSongById(action.payload.songId).then(song => {
      const prevSong = selectors.getSong(getState());

      if (isEmpty(song) || isEqual(prevSong, song)) {
        done();
        return;
      }

      dispatch(shared.actions.songLoaded(song));

      done();
    });
  },
});
