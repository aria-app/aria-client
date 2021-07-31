import { gql, useMutation } from 'urql';

import { UrqlMutationHook } from './types';

export interface LogoutResponse {
  logout: {
    success: boolean;
  };
}

export type LogoutVariables = Record<string, never>;

export const LOGOUT = gql<LogoutResponse, LogoutVariables>`
  mutation Logout {
    logout {
      success
    }
  }
`;

export const useLogout: UrqlMutationHook<LogoutResponse, LogoutVariables> =
  () => useMutation(LOGOUT);
