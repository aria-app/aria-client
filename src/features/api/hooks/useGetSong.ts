import { useQuery } from '@apollo/client';

import { GET_SONG, GetSongResponse, GetSongVariables } from '../queries';
import { QueryHook } from './types';

export const useGetSong: QueryHook<GetSongResponse, GetSongVariables> = (
  options,
) => useQuery(GET_SONG, options);
