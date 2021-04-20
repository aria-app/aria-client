import { gql } from '@apollo/client';

import { Note } from '../../../types';

export interface DuplicateNotesInput {
  ids: number[];
}

export interface DuplicateNotesResponse {
  message: string;
  notes: Note[];
  success: boolean;
}

export const DUPLICATE_NOTES = gql`
  mutation DuplicateNotes($ids: [Int!]!) {
    duplicateNotes(ids: $ids) {
      message
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
      success
    }
  }
`;
