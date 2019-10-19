import * as firebase from 'firebase/app';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import shared from '../../shared';
import * as actions from '../actions';

export default function subscribeToAuthStateEpic(action$) {
  return action$.pipe(
    ofType(shared.actions.INITIALIZED),
    mergeMap(() =>
      Observable.create(observer =>
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            observer.next(actions.userSignInSucceeded(user));
            return;
          }

          observer.next(actions.userSignOutSucceeded());
        }),
      ),
    ),
  );
}
