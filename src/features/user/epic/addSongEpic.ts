import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import Dawww from '../../../dawww';
import shared from '../../shared';
import * as selectors from '../selectors';

const { db } = shared.constants;

export default function fetchUserSongLibraryEpic(action$, state$) {
  return action$.pipe(
    ofType(shared.actions.SONG_ADD_REQUEST_STARTED),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const user = selectors.getUser(state);

      const song = {
        ...Dawww.createSong(),
        dateModified: Date.now(),
        userId: user.uid,
        ...action.payload.options,
      };

      return from(
        db
          .collection('songs')
          .doc(song.id)
          .set(song)
          .then(() => shared.actions.songAddRequestSucceeded(song)),
      );
    }),
  );
}
