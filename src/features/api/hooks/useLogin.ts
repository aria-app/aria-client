import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { LOGIN, LoginResponse, LoginVariables } from '../queries';
import { MutationHook, WrappedMutationFunction } from './types';

export const useLogin: MutationHook<LoginResponse, LoginVariables> = (
  options,
) => {
  const [mutation, ...rest] = useMutation(LOGIN, options);

  const wrappedMutation = useCallback<
    WrappedMutationFunction<LoginResponse, LoginVariables>
  >(
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
};
