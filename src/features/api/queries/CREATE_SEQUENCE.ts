import { gql } from '@apollo/client';
import { Sequence } from '../../../types';

export interface CreateSequenceInput {
  position: number;
  trackId: number;
}

export interface CreateSequenceResponse {
  message: string;
  sequence: Sequence;
  success: boolean;
}

export const CREATE_SEQUENCE = gql`
  mutation CreateSequence($input: CreateSequenceInput!) {
    createSequence(input: $input) {
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
