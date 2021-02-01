import { gql, useQuery } from '@apollo/client';

export default function useGetSongsQuery(...args) {
  return useQuery(
    gql`
      query GetSongs(
        $limit: Int
        $page: Int
        $search: String
        $sort: String
        $sortDirection: String
        $userId: ID
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
            dateModified
            id
            name
            trackCount
          }
          meta {
            currentPage
            itemsPerPage
            totalItemCount
          }
        }
      }
    `,
    ...args,
  );
}
