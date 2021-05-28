import {
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import { useCallback } from 'react';

import { Note } from '../../../types';
import {
  DUPLICATE_NOTES,
  DuplicateNotesResponse,
  GET_SEQUENCE,
  GetSequenceResponse,
} from '../queries';

type DuplicateNotesMutation = (variables: {
  notes: Note[];
  tempIds: number[];
}) => Promise<Note[]>;

interface DuplicateNotesData {
  duplicateNotes: DuplicateNotesResponse;
}

export function useDuplicateNotes(
  options?: MutationHookOptions,
): [DuplicateNotesMutation, MutationResult<DuplicateNotesData>] {
  const [mutation, ...rest] = useMutation(DUPLICATE_NOTES, options);

  const wrappedMutation = useCallback(
    async ({ notes, tempIds }) => {
      try {
        const { data } = await mutation({
          optimisticResponse: {
            duplicateNotes: {
              message: '',
              notes: notes.map((note, index) => ({
                id: tempIds[index],
                points: note.points,
                sequence: note.sequence,
                __typename: 'Note',
              })),
              success: true,
              __typename: 'DuplicateNotesResponse',
            },
          },
          update: (cache, result) => {
            const newNotes = result.data.duplicateNotes.notes;

            const prevData = cache.readQuery<GetSequenceResponse>({
              query: GET_SEQUENCE,
              variables: { id: notes[0].sequence.id },
            });

            if (!prevData || !prevData.sequence) return;

            cache.writeQuery({
              query: GET_SEQUENCE,
              variables: { id: notes[0].sequence.id },
              data: {
                sequence: {
                  ...prevData.sequence,
                  notes: [...prevData.sequence.notes, ...newNotes],
                },
              },
            });
          },
          variables: {
            ids: notes.map((note) => note.id),
          },
        });

        return data.duplicateNotes.notes;
      } catch (e) {
        console.error(e.message);
      }
    },
    [mutation],
  );

  return [wrappedMutation, ...rest];
}
