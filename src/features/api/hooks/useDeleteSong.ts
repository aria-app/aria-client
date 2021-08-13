import { gql, useMutation } from '@apollo/client';

import { SongListSong } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';

export type DeleteSongInput = number;

export interface DeleteSongData {
  deleteSong: {
    __typename: 'DeleteSongResponse';
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
  DeleteSongData,
  { songToDelete: SongListSong }
> = ({ songToDelete }) => ({
  deleteSong: {
    __typename: 'DeleteSongResponse',
    song: songToDelete,
  },
});

export const getDeleteSongUpdater: MutationUpdaterFunctionCreator<
  DeleteSongData,
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

export const useDeleteSong: MutationHook<DeleteSongData, DeleteSongVariables> =
  (options) => useMutation(DELETE_SONG, options);
