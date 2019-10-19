import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import shared from '../../shared';

const { db } = shared.constants;

export default function fetchUserSongLibraryEpic(action$) {
  return action$.pipe(
    ofType(shared.actions.SONG_DELETE_REQUEST_STARTED),
    mergeMap((action: { [key: string]: any }) =>
      from(
        db
          .collection('songs')
          .doc(action.payload.song.id)
          .delete()
          .then(() =>
            shared.actions.songDeleteRequestSucceeded(action.payload.song),
          ),
      ),
    ),
  );
}
