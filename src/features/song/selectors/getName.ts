import getOr from 'lodash/fp/getOr';

export const getName = getOr('', 'song.present.name');
