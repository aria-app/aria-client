import { useQuery } from '@apollo/client';
import { Sequence } from '../../../types';

import * as queries from '../queries';

export default function useGetSequence(...args) {
  return useQuery<Sequence>(queries.GET_SEQUENCE, ...args);
}
