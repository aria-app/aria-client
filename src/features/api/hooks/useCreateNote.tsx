import {
  FetchResult,
  MutationOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import React from 'react';

import { Point } from '../../../types';
import * as queries from '../queries';

// interface CreateNoteData {
//   createNote: queries.CreateNoteResponse;
// }

type CreateNoteMutation = (variables: {
  points: Point[];
  sequenceId: number;
}) => Promise<FetchResult>;

export const useCreateNote = (
  options?: MutationOptions,
): [CreateNoteMutation, MutationResult] => {
  const [mutation, ...rest] = useMutation(queries.CREATE_NOTE, options);

  const wrappedMutation = React.useCallback(
    ({ points, sequenceId }) =>
      mutation({
        optimisticResponse: {
          createNote: {
            __typename: 'Mutation',
            message: '',
            note: {
              __typename: 'Note',
              id: Math.round(Math.random() * -1000000),
              points,
              sequence: {
                __typename: 'Sequence',
                id: sequenceId,
              },
            },
            success: true,
          },
        },
        update: (cache, result) => {
          if (!result.data) return;

          const newNote = result.data.createNote.note;

          const prevData = cache.readQuery<queries.GetSequenceResponse>({
            query: queries.GET_SEQUENCE,
            variables: { id: sequenceId },
          });

          if (!prevData || !prevData.sequence) return;

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
      }),
    [mutation],
  );

  return [wrappedMutation, ...rest];
};
