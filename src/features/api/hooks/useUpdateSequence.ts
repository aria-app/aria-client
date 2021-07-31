import { gql, useMutation } from 'urql';

import { Sequence } from '../../../types';
import { UrqlMutationHook } from './types';

export interface UpdateSequenceResponse {
  updateSequence: {
    sequence: Sequence;
  };
}

export interface UpdateSequenceVariables {
  input: {
    id: number;
    measureCount: number;
    position: number;
  };
}

export const UPDATE_SEQUENCE = gql<
  UpdateSequenceResponse,
  UpdateSequenceVariables
>`
  mutation UpdateSequence($input: UpdateSequenceInput!) {
    updateSequence(input: $input) {
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

export const useUpdateSequence: UrqlMutationHook<
  UpdateSequenceResponse,
  UpdateSequenceVariables
> = () => useMutation(UPDATE_SEQUENCE);
