import { gql } from '@apollo/client';

export interface LogoutResponse {
  logout: {
    success: boolean;
  };
}

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;
