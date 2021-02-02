import { useMutation } from '@apollo/client';
import React from 'react';
import shortid from 'shortid';

import * as queries from '../queries';

export default function useCreateSequence(...args) {
  const [mutation, ...rest] = useMutation(queries.CREATE_SEQUENCE, ...args);

  const wrappedMutation = React.useCallback(
    async ({ position, songId, trackId }) => {
      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            createSequence: {
              sequence: {
                id: shortid.generate(),
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
