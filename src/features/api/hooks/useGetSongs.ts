import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client';

import { GET_SONGS, GetSongsResponse, GetSongsVariables } from '../queries';

type UseGetSongs = (
  options?: QueryHookOptions<GetSongsResponse, GetSongsVariables>,
) => QueryResult<GetSongsResponse>;

export const useGetSongs: UseGetSongs = (options) =>
  useQuery<GetSongsResponse>(GET_SONGS, options);
