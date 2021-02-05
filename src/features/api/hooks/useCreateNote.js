import { useMutation } from '@apollo/client';
import React from 'react';

import * as queries from '../queries';

export default function useCreateNote(...args) {
  const [mutation, ...rest] = useMutation(queries.CREATE_NOTE, ...args);

  const wrappedMutation = React.useCallback(
    async ({ points, sequenceId }) => {
      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            createNote: {
              message: '',
              note: {
                id: Math.round(Math.random() * -1000000),
                points,
                sequence: {
                  id: sequenceId,
                  __typename: 'Sequence',
                },
                __typename: 'Note',
              },
              success: true,
            },
          },
          update: (cache, result) => {
            const newNote = result.data.createNote.note;

            const prevData = cache.readQuery({
              query: queries.GET_SEQUENCE,
              variables: { id: sequenceId },
            });

            cache.writeQuery({
              query: queries.GET_SEQUENCE,
              variables: { id: sequenceId },
              data: {
                sequence: {
                  ...prevData.sequence,
                  notes: [...prevData.sequence.notes, newNote],
                },
              },
            });
          },
          variables: {
            input: {
              points,
              sequenceId,
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
