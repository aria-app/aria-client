import getOr from 'lodash/fp/getOr';

export const getUserSongLibrary = getOr({}, 'user.userSongLibrary');
