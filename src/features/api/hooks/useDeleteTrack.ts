import { gql, useMutation } from '@apollo/client';

import { Track } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongResponse } from './useGetSong';

export interface DeleteTrackResponse {
  __typename: 'DeleteTrackResponse';
  deleteTrack: {
    track: Track;
  };
}

export interface DeleteTrackVariables {
  id: number;
}

export const DELETE_TRACK = gql`
  mutation DeleteTrack($id: Int!) {
    deleteTrack(id: $id) {
      track {
        id
        song {
          id
        }
      }
    }
  }
`;

export const getDeleteTrackOptimisticResponse: MutationOptimisticResponseCreator<
  DeleteTrackResponse,
  { trackToDelete: Track }
> = ({ trackToDelete }) => ({
  __typename: 'DeleteTrackResponse',
  deleteTrack: {
    track: trackToDelete,
  },
});

export const getDeleteTrackMutationUpdater: MutationUpdaterFunctionCreator<
  DeleteTrackResponse,
  DeleteTrackVariables
> =
  () =>
  (cache, { data }) => {
    if (!data) return;

    const {
      deleteTrack: { track },
    } = data;

    const songResponse = cache.readQuery<GetSongResponse>({
      query: GET_SONG,
      variables: { id: track.song.id },
    });

    if (!songResponse) return;

    cache.writeQuery({
      query: GET_SONG,
      data: {
        song: {
          ...songResponse.song,
          tracks: songResponse.song.tracks.filter(
            (existingTrack) => existingTrack.id !== track.id,
          ),
        },
      },
    });
  };

export const useDeleteTrack: MutationHook<
  DeleteTrackResponse,
  DeleteTrackVariables
> = (options) => useMutation(DELETE_TRACK, options);
