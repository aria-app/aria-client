import { createAction } from 'redux-starter-kit';
import { Song, User } from '../../types';

export const songAddRequestStarted = createAction<Partial<Song>>(
  'songAddRequestStarted',
);
export const songAddRequestSucceeded = createAction<Song>(
  'songAddRequestSucceeded',
);
export const songDeleteRequestStarted = createAction<Song>(
  'songDeleteRequestStarted',
);
export const songDeleteRequestSucceeded = createAction<Song>(
  'songDeleteRequestSucceeded',
);
export const userSignInSucceeded = createAction<User>('userSignInSucceeded');
export const userSignOutSucceeded = createAction<User>('userSignOutSucceeded');
export const userSongLibraryFetchRequestSucceeded = createAction<Array<Song>>(
  'userSongLibraryFetchRequestSucceeded',
);
