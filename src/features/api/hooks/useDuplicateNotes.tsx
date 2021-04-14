import { useMutation } from '@apollo/client';
import React from 'react';

import * as queries from '../queries';

export default function useDuplicateNotes(...args) {
  const [mutation, ...rest] = useMutation(queries.DUPLICATE_NOTES, ...args);

  const wrappedMutation = React.useCallback(
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
