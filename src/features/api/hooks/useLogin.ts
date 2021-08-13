import { gql, useMutation } from '@apollo/client';

import { MutationHook } from './types';

export interface LoginData {
  login: {
    __typename: 'LoginResponse';
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

export const useLogin: MutationHook<LoginData, LoginVariables> = (options) =>
  useMutation(LOGIN, options);
