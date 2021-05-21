import {
  MutationHookOptions,
  MutationResult,
  useMutation,
} from '@apollo/client';
import React from 'react';

import { Track } from '../../../types';
import {
  DELETE_TRACK,
  DeleteTrackResponse,
  GET_SONG,
  GetSongResponse,
} from '../queries';

type DeleteTrackMutation = (variables: {
  songId: number;
  track: Track;
}) => Promise<void>;

interface DeleteTrackData {
  deleteTrack: DeleteTrackResponse;
}

export function useDeleteTrack(
  options?: MutationHookOptions,
): [DeleteTrackMutation, MutationResult<DeleteTrackData>] {
  const [mutation, ...rest] = useMutation(DELETE_TRACK, options);

  const wrappedMutation = React.useCallback(
    async ({ songId, track }) => {
      try {
        await mutation({
          optimisticResponse: {
            __typename: 'Mutation',
            deleteTrack: {
              success: true,
            },
          },
          update: (cache, result) => {
            if (!result.data.deleteTrack.success) return;

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
                  tracks: prevData.song.tracks.filter((t) => t.id !== track.id),
                },
              },
            });
          },
          variables: {
            id: track.id,
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
