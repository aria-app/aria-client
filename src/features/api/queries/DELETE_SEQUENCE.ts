import { gql } from '@apollo/client';

export const DELETE_SEQUENCE = gql`
  mutation DeleteSequence($id: Int!) {
    deleteSequence(id: $id) {
      success
    }
  }
`;
