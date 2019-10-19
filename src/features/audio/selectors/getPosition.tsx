import getOr from 'lodash/fp/getOr';

export const getPosition = getOr(0, 'audio.position');
