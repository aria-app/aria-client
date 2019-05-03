import * as firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyCqOmjU9tOG_qpc5cMuBhKk5pJGL76LYcY",
  authDomain: "zen-sequencer.firebaseapp.com",
  databaseURL: "https://zen-sequencer.firebaseio.com",
  projectId: "zen-sequencer",
  storageBucket: "zen-sequencer.appspot.com",
  messagingSenderId: "904455678701"
});

export const NAME = "shared";

export const authProvider =
  !!firebase.auth && new firebase.auth.GoogleAuthProvider();

export const db = !!firebase.firestore && firebase.firestore();

export const SYNC_STATES = {
  FAILED: "FAILED",
  SYNCED: "SYNCED",
  SYNCING: "SYNCING"
};
