import { gql } from '@apollo/client';
import { Note, Point } from '../../../types';

export interface UpdateNotesInput {
  id: number;
  points: Point[];
}

export interface UpdateNotesResponse {
  message: string;
  notes: Note[];
  success: boolean;
}

export const UPDATE_NOTES = gql`
  mutation UpdateNotes($input: UpdateNotesInput!) {
    updateNotes(input: $input) {
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
