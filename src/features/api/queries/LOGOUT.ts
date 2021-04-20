import { gql } from '@apollo/client';

export interface LogoutResponse {
  success: boolean;
}

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;
