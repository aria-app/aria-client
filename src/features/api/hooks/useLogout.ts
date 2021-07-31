import { gql, useMutation } from '@apollo/client';
import { merge } from 'lodash';

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

export const useLogout: MutationHook<LogoutResponse, LogoutVariables> = (
  options,
) => useMutation(LOGOUT, merge({}, options));
