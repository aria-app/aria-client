import { useMutation } from '@apollo/client';
import React from 'react';

import * as queries from '../queries';

export default function useUpdateSong(...args) {
  const [mutation, ...rest] = useMutation(queries.UPDATE_SONG, ...args);

  const wrappedMutation = React.useCallback(
    async ({ input }) => {
      const { id, ...rest } = input;
      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            updateSong: {
              song: {
                id: input.id,
                __typename: 'Song',
                ...rest,
              },
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
