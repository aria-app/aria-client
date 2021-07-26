import { gql } from '@apollo/client';
import { useMutation } from 'urql';

import { Sequence } from '../../../types';
import { MutationHook } from './types';

export interface CreateSequenceResponse {
  createSequence: {
    sequence: Sequence;
  };
}

export interface CreateSequenceVariables {
  input: {
    position: number;
    trackId: number;
  };
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
    }
  }
`;

export const useCreateSequence: MutationHook<
  CreateSequenceResponse,
  CreateSequenceVariables
> = () => useMutation(CREATE_SEQUENCE);
