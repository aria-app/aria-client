import { useMutation } from '@apollo/client';
import React from 'react';

import * as queries from '../queries';

export default function useUpdateNotes(...args) {
  const [mutation, ...rest] = useMutation(queries.UPDATE_NOTES, ...args);

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
                sequenceId: note.sequence.id,
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
