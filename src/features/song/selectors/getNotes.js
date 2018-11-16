import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getNotes =
  getOr({}, `${NAME}.present.notes`);
