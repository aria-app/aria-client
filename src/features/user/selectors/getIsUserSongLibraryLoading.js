import getOr from 'lodash/fp/getOr';
import isEmpty from 'lodash/fp/isEmpty';
import { NAME } from '../constants';

export const getIsUserSongLibraryLoading = state =>
  isEmpty(getOr({}, `${NAME}.userSongLibrary`, state));
