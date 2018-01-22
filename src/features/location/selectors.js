import getOr from 'lodash/fp/getOr';
import { NAME } from './constants';

export const getSequenceId =
  getOr('', `${NAME}.payload.sequenceId`);

export const getTrackToEditId =
  getOr('', `${NAME}.payload.trackToEditId`);

export const getType =
  getOr('', `${NAME}.type`);
