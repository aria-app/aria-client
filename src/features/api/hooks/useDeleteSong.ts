import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { merge } from 'lodash';

import { MutationHook, MutationUpdater } from './types';

export type DeleteSongInput = number;

export interface DeleteSongResponse {
  deleteSong: {
    success: boolean;
  };
}

export interface DeleteSongVariables {
  id: number;
}

export const DELETE_SONG = gql`
  mutation DeleteSong($id: Int!) {
    deleteSong(id: $id) {
      success
    }
  }
`;

export function getDeleteSongUpdater(
  songId: number,
): MutationUpdater<DeleteSongResponse, DeleteSongVariables> {
  return (cache) => {
    cache.modify({
      fields: {
        songs(existingSongs, { readField }) {
          if (!existingSongs) return;

          return {
            ...existingSongs,
            data: existingSongs.data.filter(
              (existingSong) => readField('id', existingSong) !== songId,
            ),
          };
        },
      },
    });
  };
}

export const useDeleteSong: MutationHook<
  DeleteSongResponse,
  DeleteSongVariables
> = (options) =>
  useMutation(
    DELETE_SONG,
    merge(
      {
        optimisticResponse: {
          __typename: 'DeleteSongResponse',
          deleteSong: {
            success: true,
          },
        },
      } as MutationHookOptions,
      options,
    ),
  );
