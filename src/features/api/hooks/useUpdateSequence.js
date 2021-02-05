import { useMutation } from '@apollo/client';
import React from 'react';

import * as queries from '../queries';

export default function useUpdateSequence(...args) {
  const [mutation, ...rest] = useMutation(queries.UPDATE_SEQUENCE, ...args);

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
