import { gql } from '@apollo/client';
import { Note } from '../../../types';

export interface CreateNoteResponse {
  message: string;
  note: Note;
  success: boolean;
}

export const CREATE_NOTE = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      message
      note {
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
