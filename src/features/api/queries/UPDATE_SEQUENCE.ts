import { gql } from '@apollo/client';
import { Sequence } from '../../../types';

export interface UpdateSequenceInput {
  id: number;
  measureCount: number;
  position: number;
}

export interface UpdateSequenceResponse {
  message: string;
  sequence: Sequence;
  success: boolean;
}

export const UPDATE_SEQUENCE = gql`
  mutation UpdateSequence($input: UpdateSequenceInput!) {
    updateSequence(input: $input) {
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
