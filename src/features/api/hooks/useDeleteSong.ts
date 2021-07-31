import { gql, useMutation } from 'urql';

import { UrqlMutationHook } from './types';

export type DeleteSongInput = number;

export interface DeleteSongResponse {
  deleteSong: {
    success: boolean;
  };
}

export interface DeleteSongVariables {
  id: number;
}

export const DELETE_SONG = gql<DeleteSongResponse, DeleteSongVariables>`
  mutation DeleteSong($id: Int!) {
    deleteSong(id: $id) {
      success
    }
  }
`;

export const useDeleteSong: UrqlMutationHook<
  DeleteSongResponse,
  DeleteSongVariables
> = () => useMutation(DELETE_SONG);
