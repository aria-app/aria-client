import getOr from 'lodash/fp/getOr';

export const getIsSongLoading = (state) => !getOr('', 'song.id', state);
