import { gql } from '@apollo/client';

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
        trackCount
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
