import { gql } from '@apollo/client';
import { useMutation } from 'urql';

import { MutationHook } from './types';

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

export const useDeleteSong: MutationHook<
  DeleteSongResponse,
  DeleteSongVariables
> = () => useMutation(DELETE_SONG);
