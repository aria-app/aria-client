import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client';

import { ME, MeResponse } from '../queries';

type UseMe = (
  options?: QueryHookOptions<MeResponse, Record<string, never>>,
) => QueryResult<MeResponse>;

export const useMe: UseMe = (options) => useQuery<MeResponse>(ME, options);
