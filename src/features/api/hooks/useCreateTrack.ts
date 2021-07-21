import {
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import { useCallback } from 'react';

import {
  CREATE_TRACK,
  CreateTrackInput,
  CreateTrackResponse,
  GET_SONG,
  GetSongResponse,
} from '../queries';

type CreateTrackMutation = (variables: { songId: number }) => Promise<void>;

interface CreateTrackData {
  __typename?: string;
  createTrack: CreateTrackResponse;
}

export function useCreateTrack(
  options?: MutationHookOptions<CreateTrackData, CreateTrackInput>,
): [CreateTrackMutation, MutationResult<CreateTrackData>] {
  const [mutation, ...rest] = useMutation<CreateTrackData, CreateTrackInput>(
    CREATE_TRACK,
    options,
  );

  const wrappedMutation = useCallback(
    async ({ songId }) => {
      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            createTrack: {
              message: '',
              success: true,
              track: {
                id: Math.round(Math.random() * -1000000),
                position: 999,
                sequences: [],
                voice: {
                  id: 1,
                  name: 'Pulse',
                  toneOscillatorType: 'pulse',
                  __typename: 'Voice',
                },
                volume: -10,
                __typename: 'Track',
              },
            },
          },
          update: (cache, result) => {
            const newTrack = result?.data?.createTrack?.track;
            const prevData = cache.readQuery<GetSongResponse>({
              query: GET_SONG,
              variables: { id: songId },
            });

            if (!prevData || !prevData.song) return;

            const newSong = {
              ...prevData.song,
              tracks: [...prevData.song.tracks, newTrack],
            };

            cache.writeQuery({
              query: GET_SONG,
              variables: { id: songId },
              data: {
                song: newSong,
              },
            });
          },
          variables: {
            input: {
              songId,
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
