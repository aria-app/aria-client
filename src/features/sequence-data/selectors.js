import getOr from 'lodash/fp/getOr';
import { NAME } from './constants';

export const getToolType =
  getOr('', `${NAME}.toolType`);

export const getPreviousToolType =
  getOr('', `${NAME}.previousToolType`);
