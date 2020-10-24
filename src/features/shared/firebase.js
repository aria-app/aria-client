/* eslint-disable */
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
/* eslint-enable */

const authProvider = new firebase.auth.GoogleAuthProvider();

export default {
  getDB() {
    return firebase.firestore();
  },

  initialize() {
    firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: 'zen-sequencer.firebaseapp.com',
      databaseURL: 'https://zen-sequencer.firebaseio.com',
      projectId: 'zen-sequencer',
      storageBucket: 'zen-sequencer.appspot.com',
      messagingSenderId: '904455678701',
    });
  },

  onAuthStateChanged(callback) {
    firebase.auth().onAuthStateChanged(callback);
  },

  signIn() {
    firebase.auth().signInWithRedirect(authProvider);
  },

  signOut() {
    firebase.auth().signOut();
  },
};
