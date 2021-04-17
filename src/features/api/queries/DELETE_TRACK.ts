import { gql } from '@apollo/client';

export type DeleteTrackInput = number;

export interface DeleteTrackResponse {
  success: boolean;
}

export const DELETE_TRACK = gql`
  mutation DeleteTrack($id: Int!) {
    deleteTrack(id: $id) {
      success
    }
  }
`;
