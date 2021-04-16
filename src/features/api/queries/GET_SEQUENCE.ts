import { gql } from '@apollo/client';
import { Sequence } from '../../../types';

export interface GetSequenceResponse {
  sequence: Sequence | null;
}

export const GET_SEQUENCE = gql`
  query GetSequence($id: Int!) {
    sequence(id: $id) {
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
  }
`;
