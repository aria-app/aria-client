import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getPosition = getOr(0, `${NAME}.position`);
