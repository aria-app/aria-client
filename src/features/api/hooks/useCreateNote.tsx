import {
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import React from 'react';

import { Point } from '../../../types';
import {
  CREATE_NOTE,
  CreateNoteResponse,
  GET_SEQUENCE,
  GetSequenceResponse,
} from '../queries';

export type CreateNoteMutation = (variables: {
  points: Point[];
  sequenceId: number;
}) => Promise<void>;

export interface CreateNoteData {
  createNote: CreateNoteResponse;
}

export function useCreateNote(
  options?: MutationHookOptions,
): [CreateNoteMutation, MutationResult<CreateNoteData>] {
  const [mutation, ...rest] = useMutation(CREATE_NOTE, options);

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

            const prevData = cache.readQuery<GetSequenceResponse>({
              query: GET_SEQUENCE,
              variables: { id: sequenceId },
            });

            if (!prevData || !prevData.sequence) return;

            cache.writeQuery({
              query: GET_SEQUENCE,
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
