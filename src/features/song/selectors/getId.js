import getOr from 'lodash/fp/getOr';

export const getId = getOr('', 'song.id');
