import { useMutation } from '@apollo/client';
import React from 'react';

import * as queries from '../queries';

export default function useDuplicateSequence(...args) {
  const [mutation, ...rest] = useMutation(queries.DUPLICATE_SEQUENCE, ...args);

  const wrappedMutation = React.useCallback(
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

            const prevData = cache.readQuery({
              query: queries.GET_SONG,
              variables: { id: songId },
            });

            cache.writeQuery({
              query: queries.GET_SONG,
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
