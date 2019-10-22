import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { Song } from '../../../types';
import shared from '../../shared';
import * as actions from '../actions';
import * as selectors from '../selectors';

const { db } = shared.constants;

export default function fetchUserSongLibraryEpic(action$, state$) {
  return action$.pipe(
    ofType(shared.actions.routeDashboardLoaded.type),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const user = selectors.getUser(state);

      return from(
        db
          .collection('songs')
          .where('userId', '==', user.uid)
          .get()
          .then(querySnapshot => {
            const userSongLibrary = querySnapshot.docs.map(doc => doc.data());

            return actions.userSongLibraryFetchRequestSucceeded(
              userSongLibrary as Array<Song>,
            );
          }),
      );
    }),
  );
}
