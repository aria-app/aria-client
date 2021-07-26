import { gql } from '@apollo/client';
import { useMutation } from 'urql';

import { MutationHook } from './types';

export interface LogoutResponse {
  logout: {
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

export const useLogout: MutationHook<LogoutResponse, LogoutVariables> = () =>
  useMutation(LOGOUT);
