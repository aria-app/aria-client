import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getName =
  getOr('', `${NAME}.present.name`);
