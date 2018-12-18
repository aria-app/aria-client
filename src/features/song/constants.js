import * as firebase from 'firebase/app';

export const NAME = 'song';

export const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });
