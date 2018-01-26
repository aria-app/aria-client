import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getMeasureCount =
  getOr(0, `${NAME}.measureCount`);
