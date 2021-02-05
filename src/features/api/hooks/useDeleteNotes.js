import { useMutation } from '@apollo/client';
import React from 'react';

import * as queries from '../queries';

export default function useDeleteNotes(...args) {
  const [mutation, ...rest] = useMutation(queries.DELETE_NOTES, ...args);

  const wrappedMutation = React.useCallback(
    async ({ notes }) => {
      const idsToDelete = notes.map((note) => note.id);

      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            deleteNotes: {
              message: '',
              success: true,
            },
          },
          update: (cache, result) => {
            if (!result.data.deleteNotes.success) return;

            const prevData = cache.readQuery({
              query: queries.GET_SEQUENCE,
              variables: { id: notes[0].sequence.id },
            });

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

  return [wrappedMutation, ...rest];
}
