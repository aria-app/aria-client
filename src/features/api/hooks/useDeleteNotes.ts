import {
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import { useCallback } from 'react';

import { Note } from '../../../types';
import {
  DELETE_NOTES,
  DeleteNotesInput,
  DeleteNotesResponse,
  GET_SEQUENCE,
  GetSequenceResponse,
} from '../queries';

type DeleteNotesMutation = (variables: { notes: Note[] }) => Promise<void>;

interface DeleteNotesData {
  deleteNotes: DeleteNotesResponse;
}

export function useDeleteNotes(
  options?: MutationHookOptions<DeleteNotesData, DeleteNotesInput>,
): [DeleteNotesMutation, MutationResult<DeleteNotesData>] {
  const [mutation, result] = useMutation<DeleteNotesData, DeleteNotesInput>(
    DELETE_NOTES,
    options,
  );

  const wrappedMutation: DeleteNotesMutation = useCallback(
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
