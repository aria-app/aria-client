import {
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import { useCallback } from 'react';

import {
  UPDATE_SONG,
  UpdateSongResponse,
  UpdateSongVariables,
} from '../queries';

type UpdateSongMutation = (variables: UpdateSongVariables) => Promise<void>;

interface UpdateSongData {
  updateSong: UpdateSongResponse;
}

export function useUpdateSong(
  options?: MutationHookOptions,
): [UpdateSongMutation, MutationResult<UpdateSongData>] {
  const [mutation, ...rest] = useMutation(UPDATE_SONG, options);

  const wrappedMutation = useCallback(
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
