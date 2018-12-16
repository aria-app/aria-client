import Dawww from 'dawww';
// import firebase from 'firebase';
import isEqual from 'lodash/fp/isEqual';
import throttle from 'lodash/fp/throttle';
import shared from '../features/shared';
import song from '../features/song';

// firebase.initializeApp({
//   apiKey: "AIzaSyCqOmjU9tOG_qpc5cMuBhKk5pJGL76LYcY",
//   authDomain: "zen-sequencer.firebaseapp.com",
//   databaseURL: "https://zen-sequencer.firebaseio.com",
//   projectId: "zen-sequencer",
//   storageBucket: "zen-sequencer.appspot.com",
//   messagingSenderId: "904455678701"
// });

// const provider = new firebase.auth.GoogleAuthProvider();
// const db = firebase.firestore();

// db.settings({ timestampsInSnapshots: true });

// const saveToFirebase = (obj) => {
//   db.collection('songs').doc('devSong').update(obj)
//     .catch((error) => {
//       console.error("Error updating document: ", error);
//     });
// }
// eslint-disable-next-line
const persistToLocalStorage = throttle(500)((obj) => {
  localStorage.setItem(shared.constants.localStorageKey, JSON.stringify(obj));
});
// const persistToFirebase = throttle(500)((obj) => {
//   if (firebase.auth().currentUser) {
//     saveToFirebase(obj);
//     return;
//   }
//
//   firebase.auth().signInWithPopup(provider)
//     .then(() => {
//       saveToFirebase(obj);
//     })
//     .catch((error) => {
//       console.error("Error updating document: ", error);
//     });
// });

export default store => next => (action) => {
  const prevSong = song.selectors.getSong(store.getState());
  const nextState = next(action);
  const nextSong = song.selectors.getSong(store.getState());

  if (action.type === shared.actions.INITIALIZED) {
    const localStorageSong = localStorage.getItem(
      shared.constants.localStorageKey,
    );

    const initialSong = localStorageSong
      ? JSON.parse(localStorageSong)
      : Dawww.createSong();

    store.dispatch(shared.actions.songLoaded(initialSong));

    return nextState;
  }

  if (action.type === shared.actions.SONG_LOADED) {
    return nextState;
  }

  if (!isEqual(prevSong, nextSong)) {
    persistToLocalStorage(nextSong);
    // persistToFirebase(nextSong);
  }

  return nextState;
};
