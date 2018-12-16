import * as firebase from 'firebase/app';
import { authProvider } from '../constants';

export const authenticate = () => new Promise((resolve) => {
	if (firebase.auth().currentUser) {
		resolve(firebase.auth().currentUser);
		return;
	}

	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			resolve(user);
			return;
		}

		firebase.auth().signInWithRedirect(authProvider)
			.then((signedInUser) => {
	      resolve(firebase.auth().currentUser);
	    });
	})
});
