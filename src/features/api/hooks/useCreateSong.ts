import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { merge } from 'lodash';

import { Song } from '../../../types';
import { MutationHook } from './types';

export interface CreateSongVariables {
  input: {
    name: string;
  };
}

export interface CreateSongResponse {
  __typename: 'CreateSongResponse';
  createSong: {
    song: Pick<Song, '__typename' | 'id' | 'name' | 'updatedAt'>;
  };
}

export const CREATE_SONG = gql`
  mutation CreateSong($input: CreateSongInput!) {
    createSong(input: $input) {
      song {
        id
        name
        updatedAt
      }
    }
  }
`;

export const useCreateSong: MutationHook<
  CreateSongResponse,
  CreateSongVariables
> = (options) =>
  useMutation(
    CREATE_SONG,
    merge(
      {
        update(cache, { data }) {
          cache.modify({
            fields: {
              songs(existingSongs) {
                if (!existingSongs) return;

                const newSongRef = cache.writeFragment({
                  data: data?.createSong.song,
                  fragment: gql`
                    fragment CreateSong on Song {
                      id
                      name
                      updatedAt
                    }
                  `,
                });

                return {
                  ...existingSongs,
                  data: [newSongRef, ...existingSongs.data],
                };
              },
            },
          });
        },
      } as MutationHookOptions<CreateSongResponse, CreateSongVariables>,
      options,
    ),
  );
