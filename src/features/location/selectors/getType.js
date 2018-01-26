import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getType =
  getOr('', `${NAME}.type`);
