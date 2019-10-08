import { createLogic, Logic } from 'redux-logic';
import shared from '../../shared';

const { db } = shared.constants;

interface Song {
  id?: string;
}

interface Payload {
  song?: Song;
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

export const deleteSong: LogicType = createLogic({
  type: shared.actions.SONG_DELETE_REQUEST_STARTED,
  warnTimeout: 0,
  process({ action }, dispatch, done) {
    db.collection('songs')
      .doc(action.payload.song.id)
      .delete()
      .then(() => {
        dispatch(
          shared.actions.songDeleteRequestSucceeded(action.payload.song),
        );
        done();
      })
      .catch(error => {
        console.error('Error while deleting song: ', error);
      });
  },
});
