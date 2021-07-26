import { gql } from '@apollo/client';
import { useMutation } from 'urql';

import { Note } from '../../../types';
import { MutationHook } from './types';

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

export const UPDATE_NOTES = gql`
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

export const useUpdateNotes: MutationHook<
  UpdateNotesResponse,
  UpdateNotesVariables
> = () => useMutation(UPDATE_NOTES);
