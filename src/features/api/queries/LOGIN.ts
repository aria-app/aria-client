import { gql } from '@apollo/client';

export interface LoginResponse {
  login: {
    expiresAt: string;
    success: boolean;
  };
}

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      expiresAt
      success
    }
  }
`;
