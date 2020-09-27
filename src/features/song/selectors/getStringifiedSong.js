import pipe from 'lodash/fp/pipe';

import { getSong } from './getSong';

export const getStringifiedSong = pipe(getSong, JSON.stringify);
