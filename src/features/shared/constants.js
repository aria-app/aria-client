import * as firebase from 'firebase/app';

export const NAME = 'shared';

export const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export const SYNC_STATES = {
  FAILED: 'FAILED',
  SYNCED: 'SYNCED',
  SYNCING: 'SYNCING',
};
