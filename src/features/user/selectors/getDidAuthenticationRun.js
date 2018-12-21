import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getDidAuthenticationRun =
  getOr(false, `${NAME}.didAuthenticationRun`);
