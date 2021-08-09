import { gql, useMutation } from '@apollo/client';

import { Track } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongData } from './useGetSong';

export interface UpdateTrackResponse {
  updateTrack: {
    track: Track;
  };
}

export interface UpdateTrackVariables {
  input: {
    id: number;
    voiceId?: number;
    volume?: number;
  };
}

export const UPDATE_TRACK = gql`
  mutation UpdateTrack($input: UpdateTrackInput!) {
    updateTrack(input: $input) {
      track {
        id
        position
        sequences {
          id
          measureCount
          notes {
            id
            points {
              x
              y
            }
            sequence {
              id
            }
          }
          position
          track {
            id
          }
        }
        song {
          id
        }
        voice {
          id
          name
          toneOscillatorType
        }
        volume
      }
    }
  }
`;

export const getUpdateTrackOptimisticResponse: MutationOptimisticResponseCreator<
  UpdateTrackResponse,
  { updatedTrack: Track }
> = ({ updatedTrack }) => ({
  __typename: 'UpdateTrackResponse',
  updateTrack: {
    track: updatedTrack,
  },
});

export const getUpdateTrackMutationUpdater: MutationUpdaterFunctionCreator<
  UpdateTrackResponse,
  UpdateTrackVariables
> = () => {
  return (cache, { data }) => {
    if (!data) return;

    const {
      updateTrack: { track },
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
          tracks: songData.song.tracks.map((existingTrack) =>
            existingTrack.id === track.id ? track : existingTrack,
          ),
        },
      },
    });
  };
};

export const useUpdateTrack: MutationHook<
  UpdateTrackResponse,
  UpdateTrackVariables
> = (options) => useMutation(UPDATE_TRACK, options);
