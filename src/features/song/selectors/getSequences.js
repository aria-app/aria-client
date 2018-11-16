import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getSequences =
  getOr({}, `${NAME}.tracksAndSequences.present.sequences`);
