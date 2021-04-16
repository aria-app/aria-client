import { gql } from '@apollo/client';

export interface DeleteNotesInput {
  ids: number[];
}

export interface DeleteNotesResponse {
  message: string;
  success: boolean;
}

export const DELETE_NOTES = gql`
  mutation DeleteNotes($ids: [Int!]!) {
    deleteNotes(ids: $ids) {
      message
      success
    }
  }
`;
