import { gql, useQuery } from '@apollo/client';

import { User } from '../../../types';
import { QueryHook } from './types';

export interface CurrentUserResponse {
  currentUser: Omit<User, 'songs'>;
}

export type CurrentUserVariables = Record<string, never>;

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      email
      firstName
      id
      lastName
    }
  }
`;

export const useCurrentUser: QueryHook<
  CurrentUserResponse,
  CurrentUserVariables
> = (options) => useQuery(CURRENT_USER, options);
