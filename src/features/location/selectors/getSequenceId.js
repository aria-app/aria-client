import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getSequenceId =
  getOr('', `${NAME}.payload.sequenceId`);
