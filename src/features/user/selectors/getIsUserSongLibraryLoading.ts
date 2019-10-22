import getOr from 'lodash/fp/getOr';
import isEmpty from 'lodash/fp/isEmpty';

export const getIsUserSongLibraryLoading = state =>
  isEmpty(getOr({}, 'user.userSongLibrary', state));
