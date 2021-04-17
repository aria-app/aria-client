import { useQuery } from '@apollo/client';
import { Sequence } from '../../../types';

import * as queries from '../queries';

export default function useGetSequence(...args) {
  return useQuery<{ sequence: Sequence }>(queries.GET_SEQUENCE, ...args);
}
