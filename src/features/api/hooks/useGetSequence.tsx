import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client';

import {
  GET_SEQUENCE,
  GetSequenceInput,
  GetSequenceResponse,
} from '../queries';

type UseGetSequence = (
  options?: QueryHookOptions<GetSequenceResponse, GetSequenceInput>,
) => QueryResult<GetSequenceResponse>;

export const useGetSequence: UseGetSequence = (options) =>
  useQuery<GetSequenceResponse>(GET_SEQUENCE, options);
