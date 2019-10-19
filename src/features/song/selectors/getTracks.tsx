import getOr from 'lodash/fp/getOr';

export const getTracks = getOr({}, 'song.present.tracks');
