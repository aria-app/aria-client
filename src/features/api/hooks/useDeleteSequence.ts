import { gql, useMutation } from 'urql';

import { MutationHook } from './types';

export interface DeleteSequenceResponse {
  deleteSequence: {
    success: boolean;
  };
}

export interface DeleteSequenceVariables {
  id: number;
}

export const DELETE_SEQUENCE = gql<
  DeleteSequenceResponse,
  DeleteSequenceVariables
>`
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
