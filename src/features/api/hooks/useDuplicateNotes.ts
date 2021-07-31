import { gql, useMutation } from 'urql';

import { Note } from '../../../types';
import { UrqlMutationHook } from './types';

export interface DuplicateNotesResponse {
  duplicateNotes: {
    notes: Note[];
  };
}

export interface DuplicateNotesVariables {
  ids: number[];
}

export const DUPLICATE_NOTES = gql<
  DuplicateNotesResponse,
  DuplicateNotesVariables
>`
  mutation DuplicateNotes($ids: [Int!]!) {
    duplicateNotes(ids: $ids) {
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

export const useDuplicateNotes: UrqlMutationHook<
  DuplicateNotesResponse,
  DuplicateNotesVariables
> = () => useMutation(DUPLICATE_NOTES);
