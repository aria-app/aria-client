import { gql, useMutation } from 'urql';

import { MutationHook } from './types';

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

export const useLogout: MutationHook<LogoutResponse, LogoutVariables> = () =>
  useMutation(LOGOUT);
