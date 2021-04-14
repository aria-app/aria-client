import { useQuery } from '@apollo/client';

import * as queries from '../queries';

export default function useGetVoices(...args) {
  return useQuery(queries.GET_VOICES, ...args);
}
