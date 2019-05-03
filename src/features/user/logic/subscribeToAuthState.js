import * as firebase from 'firebase/app';
import { createLogic } from 'redux-logic';
import shared from '../../shared';

export const subscribeToAuthState = createLogic({
  type: shared.actions.INITIALIZED,
  processOptions: { dispatchMultiple: true },
  warnTimeout: 0,
  process(_, dispatch, done) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(shared.actions.userSignInSucceeded(user));
      } else {
        dispatch(shared.actions.userSignOutSucceeded());
      }
    });
  },
});
