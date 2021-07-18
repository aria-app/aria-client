import {
  FetchResult,
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import { formatISO } from 'date-fns';
import { useCallback } from 'react';

import {
  CREATE_SONG,
  CreateSongResponse,
  GET_SONGS,
  GetSongsResponse,
} from '../queries';

export type CreateSongMutation = (variables: {
  name: string;
}) => Promise<FetchResult<any>>;

export interface CreateSongData {
  createSong: CreateSongResponse;
}

export function useCreateSong(
  options?: MutationHookOptions,
): [CreateSongMutation, MutationResult<CreateSongData>] {
  const [mutation, ...rest] = useMutation(CREATE_SONG, options);

  const wrappedMutation = useCallback(
    ({ name }) =>
      mutation({
        optimisticResponse: {
          __typename: 'Mutation',
          createSong: {
            message: 'Song was created.',
            song: {
              id: Math.round(Math.random() * -1000000),
              name,
              updatedAt: formatISO(new Date(), { representation: 'date' }),
              __typename: 'Song',
            },
            success: true,
          },
        },
        update: (cache, result) => {
          const newSong = result.data.createSong.song;

          const prevData = cache.readQuery<GetSongsResponse>({
            query: GET_SONGS,
            variables: {
              sort: 'updatedAt',
              sortDirection: 'desc',
            },
          });

          if (!prevData || !prevData.songs) return;

          cache.writeQuery({
            query: GET_SONGS,
            variables: {
              sort: 'updatedAt',
              sortDirection: 'desc',
            },
            data: {
              songs: {
                ...prevData.songs,
                newSong,
              },
            },
          });
        },
        variables: {
          input: {
            name,
          },
        },
      }),
    [mutation],
  );

  return [wrappedMutation, ...rest];
}
