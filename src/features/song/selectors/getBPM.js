import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getBPM =
  getOr(0, `${NAME}.bpm`);
