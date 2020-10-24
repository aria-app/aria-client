import * as firebase from 'firebase/app';

console.log(process.env);

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
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

export const columnWidths = [
  'fluid',
  'content',
  '1/2',
  '1/3',
  '2/3',
  '1/4',
  '3/4',
  '1/5',
  '2/5',
  '3/5',
  '4/5',
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

export const verticalAlignments = ['bottom', 'center', 'stretch', 'top'];
