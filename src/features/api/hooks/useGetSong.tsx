import { useQuery } from '@apollo/client';

import * as queries from '../queries';

export default function useGetSong(...args) {
  return useQuery(queries.GET_SONG, ...args);
}
