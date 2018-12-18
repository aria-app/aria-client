import * as firebase from 'firebase/app';

export const onAuthStateChanged = (callback) =>
	firebase.auth().onAuthStateChanged(callback);
