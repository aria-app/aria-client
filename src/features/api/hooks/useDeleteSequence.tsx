import {
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import { useCallback } from 'react';

import { Sequence } from '../../../types';
import {
  DELETE_SEQUENCE,
  DeleteSequenceResponse,
  GET_SONG,
  GetSongResponse,
} from '../queries';

type DeleteSequenceMutation = (variables: {
  sequence: Sequence;
  songId: number;
}) => Promise<void>;

interface DeleteSequenceData {
  deleteSequence: DeleteSequenceResponse;
}

export function useDeleteSequence(
  options?: MutationHookOptions,
): [DeleteSequenceMutation, MutationResult<DeleteSequenceData>] {
  const [mutation, ...rest] = useMutation(DELETE_SEQUENCE, options);

  const wrappedMutation = useCallback(
    async ({ sequence, songId }) => {
      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            deleteSequence: {
              success: true,
            },
          },
          update: (cache, result) => {
            if (!result.data.deleteSequence.success) return;

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
                    track.id === sequence.track.id
                      ? {
                          ...track,
                          sequences: track.sequences.filter(
                            (s) => s.id !== sequence.id,
                          ),
                        }
                      : track,
                  ),
                },
              },
            });
          },
          variables: {
            id: sequence.id,
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
