import { gql } from '@apollo/client';

export type DeleteSongInput = number;

export interface DeleteSongResponse {
  success: boolean;
}

export const DELETE_SONG = gql`
  mutation DeleteSong($id: Int!) {
    deleteSong(id: $id) {
      success
    }
  }
`;
