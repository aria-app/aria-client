import getOr from 'lodash/fp/getOr';
import pipe from 'lodash/fp/pipe';

import { getNotes } from './getNotes';

export const getNoteById = (id) => pipe(getNotes, getOr({}, id));
