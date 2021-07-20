import {
  FetchResult,
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import { useCallback } from 'react';

import { LOGIN, LoginResponse } from '../queries';

export type LoginMutation = (variables: {
  email: string;
  password: string;
}) => Promise<FetchResult<any>>;

export interface LoginData {
  createSong: LoginResponse;
}

export function useLogin(
  options?: MutationHookOptions,
): [LoginMutation, MutationResult<LoginData>] {
  const [mutation, ...rest] = useMutation(LOGIN, options);

  const wrappedMutation = useCallback<LoginMutation>(
    ({ email, password }) =>
      mutation({
        variables: {
          email,
          password,
        },
      }),
    [mutation],
  );

  return [wrappedMutation, ...rest];
}
