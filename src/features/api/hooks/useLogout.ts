import {
  FetchResult,
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import { useCallback } from 'react';

import { LOGOUT, LogoutResponse } from '../queries';

export type LogoutMutation = () => Promise<FetchResult<any>>;

export interface LogoutData {
  logout: LogoutResponse;
}

export function useLogout(
  options?: MutationHookOptions,
): [LogoutMutation, MutationResult<LogoutData>] {
  const [mutation, ...rest] = useMutation(LOGOUT, options);

  const wrappedMutation = useCallback<LogoutMutation>(
    () => mutation(),
    [mutation],
  );

  return [wrappedMutation, ...rest];
}
