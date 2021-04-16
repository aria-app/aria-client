import { gql } from '@apollo/client';

export const DELETE_SONG = gql`
  mutation DeleteSong($id: Int!) {
    deleteSong(id: $id) {
      success
    }
  }
`;
