import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import shared from '../../shared';
import * as selectors from '../selectors';

const { db } = shared.constants;

export default function fetchUserSongLibraryEpic(action$, state$) {
  return action$.pipe(
    ofType(shared.actions.DASHBOARD_LOADED),
    withLatestFrom(state$),
    mergeMap(([_, state]) => {
      const user = selectors.getUser(state);

      return from(
        db
          .collection('songs')
          .where('userId', '==', user.uid)
          .get()
          .then(querySnapshot => {
            const userSongLibrary = querySnapshot.docs.map(doc => doc.data());

            return shared.actions.userSongLibraryFetchRequestSucceeded(
              userSongLibrary,
            );
          }),
      );
    }),
  );
}
