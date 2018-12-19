import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getSongs =
  getOr({}, `${NAME}.present.songs`);
