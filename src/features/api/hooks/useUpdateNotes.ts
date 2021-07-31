import { gql, useMutation } from 'urql';

import { Note } from '../../../types';
import { UrqlMutationHook } from './types';

export interface UpdateNotesResponse {
  updateNotes: {
    notes: Note[];
  };
}

export interface UpdateNotesVariables {
  input: {
    notes: Note[];
  };
}

export const UPDATE_NOTES = gql<UpdateNotesResponse, UpdateNotesVariables>`
  mutation UpdateNotes($input: UpdateNotesInput!) {
    updateNotes(input: $input) {
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
    }
  }
`;

export const useUpdateNotes: UrqlMutationHook<
  UpdateNotesResponse,
  UpdateNotesVariables
> = () => useMutation(UPDATE_NOTES);
