import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getId =
  getOr('', `${NAME}.present.id`);
