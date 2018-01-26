import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getTrackToEditId =
  getOr('', `${NAME}.payload.trackToEditId`);
