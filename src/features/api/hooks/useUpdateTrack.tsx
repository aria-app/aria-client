import {
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import isNil from 'lodash/fp/isNil';
import { useCallback } from 'react';

import {
  UPDATE_TRACK,
  UpdateTrackInput,
  UpdateTrackResponse,
} from '../queries';

type UpdateTrackMutation = (variables: {
  input: UpdateTrackInput;
}) => Promise<void>;

interface UpdateTrackData {
  updateTrack: UpdateTrackResponse;
}

export function useUpdateTrack(
  options?: MutationHookOptions,
): [UpdateTrackMutation, MutationResult<UpdateTrackData>] {
  const [mutation, ...rest] = useMutation(UPDATE_TRACK, options);

  const wrappedMutation = useCallback(
    async ({ input }) => {
      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            updateTrack: {
              message: '',
              success: true,
              track: {
                id: input.id,
                ...(!isNil(input.voice) ? { voice: input.voice } : {}),
                ...(!isNil(input.volume) ? { volume: input.volume } : {}),
                __typename: 'Track',
              },
            },
          },
          variables: {
            input: {
              id: input.id,
              ...(!isNil(input.voice) ? { voiceId: input.voice.id } : {}),
              ...(!isNil(input.volume) ? { volume: input.volume } : {}),
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
