import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client';

import { GET_VOICES, GetVoicesResponse } from '../queries';

type UseGetVoices = (
  options?: QueryHookOptions<GetVoicesResponse, never>,
) => QueryResult<GetVoicesResponse>;

export const useGetVoices: UseGetVoices = (options) =>
  useQuery<GetVoicesResponse>(GET_VOICES, options);
