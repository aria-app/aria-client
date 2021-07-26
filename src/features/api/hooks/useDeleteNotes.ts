import { gql } from '@apollo/client';
import { useMutation } from 'urql';

import { MutationHook } from './types';

export interface DeleteNotesResponse {
  success: boolean;
}

export interface DeleteNotesVariables {
  ids: number[];
}

export const DELETE_NOTES = gql`
  mutation DeleteNotes($ids: [Int!]!) {
    deleteNotes(ids: $ids) {
      success
    }
  }
`;

export const useDeleteNotes: MutationHook<
  DeleteNotesResponse,
  DeleteNotesVariables
> = () => useMutation(DELETE_NOTES);
