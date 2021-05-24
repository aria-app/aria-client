import {
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import { useCallback } from 'react';

import {
  CREATE_SEQUENCE,
  CreateSequenceResponse,
  GET_SONG,
  GetSongResponse,
} from '../queries';

export type CreateSequenceMutation = (variables: {
  position: number;
  songId: number;
  trackId: number;
}) => Promise<void>;

export interface CreateSequenceData {
  createSequence: CreateSequenceResponse;
}

export function useCreateSequence(
  options?: MutationHookOptions,
): [CreateSequenceMutation, MutationResult<CreateSequenceData>] {
  const [mutation, ...rest] = useMutation(CREATE_SEQUENCE, options);

  const wrappedMutation = useCallback(
    async ({ position, songId, trackId }) => {
      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            createSequence: {
              sequence: {
                id: Math.round(Math.random() * -1000000),
                measureCount: 1,
                notes: [],
                position,
                track: {
                  id: trackId,
                  __typename: 'Track',
                },
                __typename: 'Sequence',
              },
            },
          },
          update: (cache, result) => {
            const newSequence = result.data.createSequence.sequence;

            const prevData = cache.readQuery<GetSongResponse>({
              query: GET_SONG,
              variables: { id: songId },
            });

            if (!prevData || !prevData.song) return;

            cache.writeQuery({
              query: GET_SONG,
              variables: { id: songId },
              data: {
                song: {
                  ...prevData.song,
                  tracks: prevData.song.tracks.map((track) =>
                    track.id === newSequence.track.id
                      ? {
                          ...track,
                          sequences: [...track.sequences, newSequence],
                        }
                      : track,
                  ),
                },
              },
            });
          },
          variables: {
            input: {
              position,
              trackId,
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
