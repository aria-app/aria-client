import { gql } from '@apollo/client';

export type DeleteSequenceInput = number;

export interface DeleteSequenceResponse {
  success: boolean;
}

export const DELETE_SEQUENCE = gql`
  mutation DeleteSequence($id: Int!) {
    deleteSequence(id: $id) {
      success
    }
  }
`;
