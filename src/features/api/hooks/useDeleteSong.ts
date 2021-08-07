import { gql, useMutation } from '@apollo/client';

import { SongListSong } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';

export type DeleteSongInput = number;

export interface DeleteSongResponse {
  deleteSong: {
    song: SongListSong;
  };
}

export interface DeleteSongVariables {
  id: number;
}

export const DELETE_SONG = gql`
  mutation DeleteSong($id: Int!) {
    deleteSong(id: $id) {
      song {
        id
      }
    }
  }
`;

export const getDeleteSongOptimisticResponse: MutationOptimisticResponseCreator<
  DeleteSongResponse,
  { songToDelete: SongListSong }
> = ({ songToDelete }) => ({
  __typename: 'DeleteSongResponse',
  deleteSong: {
    song: songToDelete,
  },
});

export const getDeleteSongUpdater: MutationUpdaterFunctionCreator<
  DeleteSongResponse,
  DeleteSongVariables
> =
  () =>
  (cache, { data }) => {
    if (!data) return;

    const {
      deleteSong: { song },
    } = data;

    cache.modify({
      fields: {
        songs(existingSongs, { readField }) {
          if (!existingSongs) return;

          return {
            ...existingSongs,
            data: existingSongs.data.filter(
              (existingSong) => readField('id', existingSong) !== song.id,
            ),
          };
        },
      },
    });
  };

export const useDeleteSong: MutationHook<
  DeleteSongResponse,
  DeleteSongVariables
> = (options) => useMutation(DELETE_SONG, options);
