import getOr from 'lodash/fp/getOr';

export const getSequences = getOr({}, 'song.present.sequences');
