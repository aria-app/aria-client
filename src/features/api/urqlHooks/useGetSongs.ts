import { useQuery } from 'urql';

import { GET_SONGS, GetSongsResponse, GetSongsVariables } from '../queries';
import { QueryHook } from './types';

export const useGetSongs: QueryHook<GetSongsResponse, GetSongsVariables> = (
  args = {},
) => useQuery({ query: GET_SONGS, ...args });
