import {
  cacheExchange as graphcacheExchange,
  Entity,
} from '@urql/exchange-graphcache';
import { gql } from 'urql';

import { PaginatedResponse, SongListSong } from '../../../../types';

export const cacheExchange = graphcacheExchange({
  keys: {
    PaginationMetadata: () => null,
    SongsResponse: (data) => {
      const response = data as unknown as PaginatedResponse<SongListSong>;
      return serializeIds(response?.data);
    },
  },
  optimistic: {
    deleteSong: () => ({ success: true }),
  },
  updates: {
    Mutation: {
      createSong(result, args, cache, info) {
        const currentUserId = cache.resolve(
          cache.resolve({ __typename: 'Query' }, 'me') as Entity,
          'id',
        );

        const GetSongs = gql`
          {
            songs(sort: $sort, sortDirection: $sortDirection, userId: $userId) {
              data {
                id
              }
            }
          }
        `;

        cache
          .inspectFields('Query')
          .filter(
            (field) =>
              field.fieldName === 'songs' &&
              field.arguments?.userId === currentUserId,
          )
          .forEach((field) => {
            cache.updateQuery(
              { query: GetSongs, variables: field.arguments },
              (data) => {
                data?.songs?.data?.push(result.createSong);
                return data;
              },
            );
          });
      },
      deleteSong(result, args, cache, info) {
        const currentUserId = cache.resolve(
          cache.resolve({ __typename: 'Query' }, 'me') as Entity,
          'id',
        );

        const GetSongs = gql`
          {
            songs(sort: $sort, sortDirection: $sortDirection, userId: $userId) {
              data {
                id
              }
            }
          }
        `;

        cache
          .inspectFields('Query')
          .filter(
            (field) =>
              field.fieldName === 'songs' &&
              field.arguments?.userId === currentUserId,
          )
          .forEach((field) => {
            cache.updateQuery(
              { query: GetSongs, variables: field.arguments },
              (data) => {
                if (!data) return data;
                console.log('result', result);
                console.log('args', args);
                console.log('data before', data.songs.data);
                data.songs.data = data.songs.data.filter(
                  (song) => song.id !== args.id,
                );
                console.log('data after', data.songs.data);

                return data;
              },
            );
          });
      },
    },
  },
});

function serializeIds<T extends { id: number }>(items: T[]): string {
  return items.reduce((acc, cur) => `${acc}${cur}`, '');
}
