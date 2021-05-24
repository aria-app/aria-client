import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client';

import { GET_SONG, GetSongInput, GetSongResponse } from '../queries';

type UseGetSong = (
  options?: QueryHookOptions<GetSongResponse, GetSongInput>,
) => QueryResult<GetSongResponse>;

export const useGetSong: UseGetSong = (options) =>
  useQuery<GetSongResponse>(GET_SONG, options);
