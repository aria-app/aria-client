import { gql } from '@apollo/client';

export const DUPLICATE_SEQUENCE = gql`
  mutation DuplicateSequence($id: Int!) {
    duplicateSequence(id: $id) {
      message
      sequence {
        id
        measureCount
        notes {
          id
          points {
            x
            y
          }
          sequence {
            id
          }
        }
        position
        track {
          id
        }
      }
      success
    }
  }
`;
