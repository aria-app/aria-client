import getOr from 'lodash/fp/getOr';

export const getMeasureCount = getOr(0, 'song.measureCount');
