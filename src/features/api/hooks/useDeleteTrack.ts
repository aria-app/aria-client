import { gql, useMutation } from '@apollo/client';

import { Track } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongData } from './useGetSong';

export interface DeleteTrackData {
  deleteTrack: {
    __typename: 'DeleteTrackResponse';
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
  DeleteTrackData,
  { trackToDelete: Track }
> = ({ trackToDelete }) => ({
  deleteTrack: {
    __typename: 'DeleteTrackResponse',
    track: trackToDelete,
  },
});

export const getDeleteTrackMutationUpdater: MutationUpdaterFunctionCreator<
  DeleteTrackData,
  DeleteTrackVariables
> =
  () =>
  (cache, { data }) => {
    if (!data) return;

    const {
      deleteTrack: { track },
    } = data;

    const songData = cache.readQuery<GetSongData>({
      query: GET_SONG,
      variables: { id: track.song.id },
    });

    if (!songData) return;

    cache.writeQuery({
      query: GET_SONG,
      data: {
        song: {
          ...songData.song,
          tracks: songData.song.tracks.filter(
            (existingTrack) => existingTrack.id !== track.id,
          ),
        },
      },
    });
  };

export const useDeleteTrack: MutationHook<
  DeleteTrackData,
  DeleteTrackVariables
> = (options) => useMutation(DELETE_TRACK, options);
