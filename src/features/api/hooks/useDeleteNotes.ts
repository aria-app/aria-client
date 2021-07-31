import { gql, useMutation } from 'urql';

import { UrqlMutationHook } from './types';

export interface DeleteNotesResponse {
  success: boolean;
}

export interface DeleteNotesVariables {
  ids: number[];
}

export const DELETE_NOTES = gql<DeleteNotesResponse, DeleteNotesVariables>`
  mutation DeleteNotes($ids: [Int!]!) {
    deleteNotes(ids: $ids) {
      success
    }
  }
`;

export const useDeleteNotes: UrqlMutationHook<
  DeleteNotesResponse,
  DeleteNotesVariables
> = () => useMutation(DELETE_NOTES);
