import {
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import React from 'react';

import { Note } from '../../../types';
import { UPDATE_NOTES, UpdateNotesResponse } from '../queries';

type UpdateNotesMutation = (variables: { notes: Note[] }) => Promise<void>;

interface UpdateNotesData {
  updateNotes: UpdateNotesResponse;
}

export function useUpdateNotes(
  options?: MutationHookOptions,
): [UpdateNotesMutation, MutationResult<UpdateNotesData>] {
  const [mutation, ...rest] = useMutation(UPDATE_NOTES, options);

  const wrappedMutation = React.useCallback(
    async ({ notes }) => {
      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            updateNotes: {
              message: '',
              notes: notes.map((note) => ({
                id: note.id,
                points: note.points,
                sequence: note.sequence,
                __typename: 'Note',
              })),
              success: true,
            },
          },
          variables: {
            input: {
              notes: notes.map((note) => ({
                id: note.id,
                points: note.points.map((point) => ({
                  x: point.x,
                  y: point.y,
                })),
              })),
            },
          },
        });
      } catch (e) {
        console.error(e.message);
      }
    },
    [mutation],
  );

  return [wrappedMutation, ...rest];
}
