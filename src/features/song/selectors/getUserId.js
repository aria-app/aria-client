import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getUserId =
  getOr('', `${NAME}.present.userId`);
