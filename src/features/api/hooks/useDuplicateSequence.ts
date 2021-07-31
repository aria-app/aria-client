import { gql, useMutation } from 'urql';

import { Sequence } from '../../../types';
import { UrqlMutationHook } from './types';

export interface DuplicateSequenceResponse {
  duplicateSequence: {
    sequence: Sequence;
  };
}

export type DuplicateSequenceVariables = {
  id: number;
};

export const DUPLICATE_SEQUENCE = gql<
  DuplicateSequenceResponse,
  DuplicateSequenceVariables
>`
  mutation DuplicateSequence($id: Int!) {
    duplicateSequence(id: $id) {
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

export const useDuplicateSequence: UrqlMutationHook<
  DuplicateSequenceResponse,
  DuplicateSequenceVariables
> = () => useMutation(DUPLICATE_SEQUENCE);
