import getOr from 'lodash/fp/getOr';

export const getUser = getOr(null, 'user.user');
