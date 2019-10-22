import getOr from 'lodash/fp/getOr';

export const getDidAuthenticationRun = getOr(
  false,
  'user.didAuthenticationRun',
);
