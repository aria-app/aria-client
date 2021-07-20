import { gql } from '@apollo/client';

export interface LoginResponse {
  login: {
    expiresAt: number;
    success: boolean;
  };
}

export interface LoginVariables {
  email: string;
  password: string;
}

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      expiresAt
      success
    }
  }
`;
