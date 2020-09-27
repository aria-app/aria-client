import { createAction } from 'redux-starter-kit';

export const songAddRequestStarted = createAction('songAddRequestStarted');
export const songAddRequestSucceeded = createAction('songAddRequestSucceeded');
export const songDeleteRequestStarted = createAction(
  'songDeleteRequestStarted',
);
export const songDeleteRequestSucceeded = createAction(
  'songDeleteRequestSucceeded',
);
export const userSignInSucceeded = createAction('userSignInSucceeded');
export const userSignOutSucceeded = createAction('userSignOutSucceeded');
export const userSongLibraryFetchRequestSucceeded = createAction(
  'userSongLibraryFetchRequestSucceeded',
);
