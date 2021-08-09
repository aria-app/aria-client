import { gql, useMutation } from '@apollo/client';

import { MutationHook } from './types';

export interface LogoutData {
  logout: {
    __typename: 'LogoutResponse';
    success: boolean;
  };
}

export type LogoutVariables = Record<string, never>;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

export const useLogout: MutationHook<LogoutData, LogoutVariables> = (options) =>
  useMutation(LOGOUT, options);
