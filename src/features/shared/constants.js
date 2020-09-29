import * as firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: 'AIzaSyCqOmjU9tOG_qpc5cMuBhKk5pJGL76LYcY',
  authDomain: 'zen-sequencer.firebaseapp.com',
  databaseURL: 'https://zen-sequencer.firebaseio.com',
  projectId: 'zen-sequencer',
  storageBucket: 'zen-sequencer.appspot.com',
  messagingSenderId: '904455678701',
});

export const authProvider =
  !!firebase.auth && new firebase.auth.GoogleAuthProvider();

export const borderRadii = ['none', 'small', 'medium', 'full'];

export const colors = [
  'background',
  'border',
  'error',
  'none',
  'paper',
  'primary',
  'subtle',
  'success',
  'text',
  'warning',
];

export const db = !!firebase.firestore && firebase.firestore();

export const dividerThicknesses = ['thin', 'regular'];

export const spacingAliases = [
  'none',
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'gutter',
  'large',
  'xlarge',
  'xxlarge',
  '-xxsmall',
  '-xsmall',
  '-small',
  '-medium',
  '-gutter',
  '-large',
  '-xlarge',
  '-xxlarge',
];

export const stackAlignments = ['center', 'left', 'right', 'stretch'];

export const SYNC_STATES = {
  FAILED: 'FAILED',
  SYNCED: 'SYNCED',
  SYNCING: 'SYNCING',
};

export const textVariants = ['body', 'bodySmall', 'headline', 'label'];
