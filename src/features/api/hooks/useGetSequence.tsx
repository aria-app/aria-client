import { useQuery } from '@apollo/client';

import * as queries from '../queries';

export default function useGetSequence(...args) {
  return useQuery(queries.GET_SEQUENCE, ...args);
}
