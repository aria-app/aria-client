import { gql } from '@apollo/client';
import { useMemo } from 'react';
import { useQuery } from 'urql';

import { PaginatedResponse, SongListSong } from '../../../types';
import { QueryHook } from './types';

export interface GetSongsResponse {
  songs: PaginatedResponse<SongListSong>;
}

export interface GetSongsVariables {
  limit?: number;
  page?: number;
  search?: string;
  sort?: string;
  sortDirection?: 'asc' | 'desc';
  userId: number;
}

export const GET_SONGS = gql`
  query GetSongs(
    $limit: Int
    $page: Int
    $search: String
    $sort: String
    $sortDirection: String
    $userId: Int
  ) {
    songs(
      limit: $limit
      page: $page
      search: $search
      sort: $sort
      sortDirection: $sortDirection
      userId: $userId
    ) {
      data {
        id
        name
        updatedAt
      }
      meta {
        currentPage
        itemsPerPage
        totalItemCount
      }
    }
  }
`;

export const useGetSongs: QueryHook<GetSongsResponse, GetSongsVariables> = (
  args,
) => {
  const context = useMemo(() => ({ additionalTypenames: ['Song'] }), []);

  return useQuery({
    context,
    query: GET_SONGS,
    ...args,
  });
};
