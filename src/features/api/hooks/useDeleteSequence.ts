import { gql } from '@apollo/client';
import { useMutation } from 'urql';

import { MutationHook } from './types';

export interface DeleteSequenceResponse {
  deleteSequence: {
    success: boolean;
  };
}

export interface DeleteSequenceVariables {
  id: number;
}

export const DELETE_SEQUENCE = gql`
  mutation DeleteSequence($id: Int!) {
    deleteSequence(id: $id) {
      success
    }
  }
`;

export const useDeleteSequence: MutationHook<
  DeleteSequenceResponse,
  DeleteSequenceVariables
> = () => useMutation(DELETE_SEQUENCE);
