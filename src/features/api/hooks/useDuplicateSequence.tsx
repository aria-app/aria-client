import {
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import { useCallback } from 'react';

import { Sequence } from '../../../types';
import {
  DUPLICATE_SEQUENCE,
  DuplicateSequenceResponse,
  GET_SONG,
  GetSongResponse,
} from '../queries';

type DuplicateSequenceMutation = (variables: {
  sequence: Sequence;
  songId: number;
  tempId: number;
}) => Promise<Sequence>;

interface DuplicateSequenceData {
  duplicateSequence: DuplicateSequenceResponse;
}

export function useDuplicateSequence(
  options?: MutationHookOptions,
): [DuplicateSequenceMutation, MutationResult<DuplicateSequenceData>] {
  const [mutation, ...rest] = useMutation(DUPLICATE_SEQUENCE, options);

  const wrappedMutation = useCallback(
    async ({ sequence, songId, tempId }) => {
      try {
        const { data } = await mutation({
          optimisticResponse: {
            duplicateSequence: {
              message: '',
              sequence: {
                id: tempId,
                measureCount: sequence.measureCount,
                notes: sequence.notes,
                position: sequence.position,
                track: sequence.track,
                __typename: 'Sequence',
              },
              success: true,
              __typename: 'DuplicateSequenceResponse',
            },
          },
          update: (cache, result) => {
            const newSequence = result.data.duplicateSequence.sequence;

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
            id: sequence.id,
          },
        });

        return data.duplicateSequence.sequence;
      } catch (e) {
        console.error(e.message);
      }
    },
    [mutation],
  );

  return [wrappedMutation, ...rest];
}
