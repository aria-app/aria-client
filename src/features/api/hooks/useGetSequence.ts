import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client';

import {
  GET_SEQUENCE,
  GetSequenceResponse,
  GetSequenceVariables,
} from '../queries';

type UseGetSequence = (
  options?: QueryHookOptions<GetSequenceResponse, GetSequenceVariables>,
) => QueryResult<GetSequenceResponse>;

export const useGetSequence: UseGetSequence = (options) =>
  useQuery<GetSequenceResponse>(GET_SEQUENCE, options);
