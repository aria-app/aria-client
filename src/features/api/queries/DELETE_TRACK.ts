import { gql } from '@apollo/client';

export const DELETE_TRACK = gql`
  mutation DeleteTrack($id: Int!) {
    deleteTrack(id: $id) {
      success
    }
  }
`;
