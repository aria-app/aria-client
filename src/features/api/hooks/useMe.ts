import { gql } from '@apollo/client';
import { useMemo } from 'react';
import { useQuery } from 'urql';

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

export const useMe: QueryHook<MeResponse, MeVariables> = (args = {}) => {
  const context = useMemo(() => ({ additionalTypenames: ['User'] }), []);

  return useQuery({
    context,
    query: ME,
    ...args,
  });
};
