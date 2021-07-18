import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client';

import { GET_SONG, GetSongResponse, GetSongVariables } from '../queries';

type UseGetSong = (
  options?: QueryHookOptions<GetSongResponse, GetSongVariables>,
) => QueryResult<GetSongResponse>;

export const useGetSong: UseGetSong = (options) =>
  useQuery<GetSongResponse>(GET_SONG, options);
