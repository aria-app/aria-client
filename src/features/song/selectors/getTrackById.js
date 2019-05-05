import getOr from 'lodash/fp/getOr';
import pipe from 'lodash/fp/pipe';
import { getTracks } from './getTracks';

export const getTrackById = id =>
  pipe(
    getTracks,
    getOr({}, id),
  );
