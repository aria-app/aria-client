import { useMutation } from '@apollo/client';
import React from 'react';

import * as queries from '../queries';

export default function useCreateTrack(...args) {
  const [mutation, ...rest] = useMutation(queries.CREATE_TRACK, ...args);

  const wrappedMutation = React.useCallback(
    async ({ songId }) => {
      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            createTrack: {
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
            const newTrack = result.data.createTrack.track;
            const prevData = cache.readQuery({
              query: queries.GET_SONG,
              variables: { id: songId },
            });
            const newSong = {
              ...prevData.song,
              tracks: [...prevData.song.tracks, newTrack],
            };

            cache.writeQuery({
              query: queries.GET_SONG,
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
