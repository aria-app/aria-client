import getOr from 'lodash/fp/getOr';

export const getBPM = getOr(0, `song.bpm`);
