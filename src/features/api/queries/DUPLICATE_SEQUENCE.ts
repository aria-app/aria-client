import { gql } from '@apollo/client';

import { Sequence } from '../../../types';

export type DuplicateSequenceInput = number;

export interface DuplicateSequenceResponse {
  message: string;
  sequence: Sequence;
  success: boolean;
}

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
