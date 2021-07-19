import {
  FetchResult,
  gql,
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import { useCallback } from 'react';

import { CREATE_SONG, CreateSongResponse } from '../queries';

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
        update(cache, { data: { createSong } }) {
          cache.modify({
            fields: {
              songs(existingSongs = []) {
                const newSongRef = cache.writeFragment({
                  data: createSong.song,
                  fragment: gql`
                    fragment NewSong on Song {
                      id
                      name
                      updatedAt
                    }
                  `,
                });

                return {
                  ...existingSongs,
                  data: [...existingSongs.data, newSongRef],
                };
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
