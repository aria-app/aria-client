import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getIsSongLoading = state =>
  !getOr('', `${NAME}.present.id`, state);
