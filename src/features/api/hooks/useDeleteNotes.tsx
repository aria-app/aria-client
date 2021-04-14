import { MutationResult, useMutation } from '@apollo/client';
import React from 'react';
import { Note } from '../../../types';

import * as queries from '../queries';

type DeleteNotesMutation = (variables: { notes: Note[] }) => Promise<void>;

interface DeleteNotesData {
  deleteNotes: queries.DeleteNotesResponse;
}

export default function useDeleteNotes(
  ...args
): [DeleteNotesMutation, MutationResult<DeleteNotesData>] {
  const [mutation, result] = useMutation<
    DeleteNotesData,
    queries.DeleteNotesInput
  >(queries.DELETE_NOTES, ...args);

  const wrappedMutation: DeleteNotesMutation = React.useCallback(
    async ({ notes }) => {
      const idsToDelete = notes.map((note) => note.id);

      try {
        await mutation({
          optimisticResponse: {
            deleteNotes: {
              message: '',
              success: true,
            },
          },
          update: (cache, result) => {
            if (!result?.data?.deleteNotes.success) return;

            const prevData = cache.readQuery<queries.GetSequenceResponse>({
              query: queries.GET_SEQUENCE,
              variables: { id: notes[0].sequence.id },
            });

            if (!prevData || !prevData.sequence) return;

            cache.writeQuery({
              query: queries.GET_SEQUENCE,
              variables: { id: notes[0].sequence.id },
              data: {
                sequence: {
                  ...prevData.sequence,
                  notes: prevData.sequence.notes.filter(
                    (note) => !idsToDelete.includes(note.id),
                  ),
                },
              },
            });
          },
          variables: {
            ids: idsToDelete,
          },
        });
      } catch (e) {
        console.error(e.message);
      }
    },
    [mutation],
  );

  return [wrappedMutation, result];
}
