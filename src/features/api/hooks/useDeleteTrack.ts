import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { merge } from 'lodash';

import { MutationHook, MutationUpdaterFunctionCreator } from './types';
import { GET_SONG, GetSongResponse } from './useGetSong';

export interface DeleteTrackResponse {
  deleteTrack: {
    success: boolean;
  };
}

export interface DeleteTrackVariables {
  id: number;
}

export const getDeleteTrackMutationUpdater: MutationUpdaterFunctionCreator<
  DeleteTrackResponse,
  DeleteTrackVariables,
  { songId: number }
> = ({ id }, { songId }) => {
  return (cache, { data }) => {
    if (!data) return;

    const songResponse = cache.readQuery<GetSongResponse>({
      query: GET_SONG,
      variables: { id: songId },
    });

    if (!songResponse) return;

    cache.writeQuery({
      query: GET_SONG,
      data: {
        song: {
          ...songResponse.song,
          tracks: songResponse.song.tracks.filter((track) => track.id !== id),
        },
      },
    });
  };
};

export const DELETE_TRACK = gql`
  mutation DeleteTrack($id: Int!) {
    deleteTrack(id: $id) {
      success
    }
  }
`;

export const useDeleteTrack: MutationHook<
  DeleteTrackResponse,
  DeleteTrackVariables
> = (options) =>
  useMutation(
    DELETE_TRACK,
    merge(
      {
        optimisticResponse: {
          __typename: 'DeleteTrackResponse',
          deleteTrack: {
            success: true,
          },
        },
      } as MutationHookOptions<DeleteTrackResponse, DeleteTrackVariables>,
      options,
    ),
  );
