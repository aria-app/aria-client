import { useMutation } from '@apollo/client';
import React from 'react';

import * as queries from '../queries';

export default function useDeleteSequence(...args) {
  const [mutation, ...rest] = useMutation(queries.DELETE_SEQUENCE, ...args);

  const wrappedMutation = React.useCallback(
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
