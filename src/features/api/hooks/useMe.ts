import { gql, useQuery } from '@apollo/client';

import { User } from '../../../types';
import { QueryHook } from './types';

export interface MeResponse {
  me: Omit<User, 'songs'>;
}

export type MeVariables = Record<string, never>;

export const ME = gql`
  query Me {
    me {
      email
      firstName
      id
      lastName
    }
  }
`;

export const useMe: QueryHook<MeResponse, MeVariables> = (options) =>
  useQuery(ME, options);
