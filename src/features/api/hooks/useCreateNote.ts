import { gql } from '@apollo/client';
import { useMutation } from 'urql';

import { Note, Point } from '../../../types';
import { MutationHook } from './types';

export interface CreateNoteResponse {
  createNote: {
    note: Note;
  };
}

export interface CreateNoteVariables {
  input: {
    points: Point[];
    sequenceId: number;
  };
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

export const useCreateNote: MutationHook<
  CreateNoteResponse,
  CreateNoteVariables
> = () => useMutation(CREATE_NOTE);
