import {
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import React from 'react';

import {
  UPDATE_SEQUENCE,
  UpdateSequenceInput,
  UpdateSequenceResponse,
} from '../queries';

type UpdateSequenceMutation = (variables: {
  input: UpdateSequenceInput;
}) => Promise<void>;

interface UpdateSequenceData {
  updateSequence: UpdateSequenceResponse;
}

export function useUpdateSequence(
  options?: MutationHookOptions,
): [UpdateSequenceMutation, MutationResult<UpdateSequenceData>] {
  const [mutation, ...rest] = useMutation(UPDATE_SEQUENCE, options);

  const wrappedMutation = React.useCallback(
    async ({ input }) => {
      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            updateSequence: {
              message: '',
              sequence: {
                __typename: 'Sequence',
                ...input,
              },
              success: true,
            },
          },
          variables: {
            input,
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
