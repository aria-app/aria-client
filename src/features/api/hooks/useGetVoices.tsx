import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client';

import * as queries from '../queries';
import { GetVoicesResponse } from '../queries';

type UseGetVoices = (
  options?: QueryHookOptions<GetVoicesResponse, never>,
) => QueryResult<GetVoicesResponse>;

export const useGetVoices: UseGetVoices = (options) =>
  useQuery<GetVoicesResponse>(queries.GET_VOICES, options);
