import { useMemo } from 'react';
import { gql, useQuery } from 'urql';

import { User } from '../../../types';
import { UrqlQueryHook } from './types';

export interface MeResponse {
  me: Omit<User, 'songs'>;
}

export type MeVariables = Record<string, never>;

export const ME = gql<MeResponse, MeVariables>`
  query Me {
    me {
      email
      firstName
      id
      lastName
    }
  }
`;

export const useMe: UrqlQueryHook<MeResponse, MeVariables> = (args = {}) => {
  const context = useMemo(() => ({ additionalTypenames: ['User'] }), []);

  return useQuery({
    context,
    query: ME,
    ...args,
  });
};
