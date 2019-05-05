import getOr from 'lodash/fp/getOr';
import { NAME } from '../constants';

export const getFocusedSequenceId = getOr('', `${NAME}.focusedSequenceId`);
