import { gql } from '@apollo/client';
import { useMutation } from 'urql';

import { MutationHook } from './types';

export interface LoginResponse {
  login: {
    expiresAt: number;
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
    }
  }
`;

export const useLogin: MutationHook<LoginResponse, LoginVariables> = () =>
  useMutation(LOGIN);
