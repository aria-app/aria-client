import isNil from 'lodash/fp/isNil';
import user from '../../user';

const { getUser } = user.selectors;

export const getIsAuthenticated = state =>
  !isNil(getUser(state));
