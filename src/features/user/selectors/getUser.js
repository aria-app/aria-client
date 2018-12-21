import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getUser =
  getOr(null, `${NAME}.user`);
