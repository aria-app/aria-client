import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { merge } from 'lodash';

import { Track } from '../../../types';
import { MutationHook, MutationOptimisticResponseCreator } from './types';
import { GET_SONG, GetSongResponse } from './useGetSong';

export interface CreateTrackResponse {
  __typename: 'CreateTrackResponse';
  createTrack: {
    track: Omit<Track, 'isMuted' | 'isSoloing'>;
  };
}

export interface CreateTrackVariables {
  input: {
    songId: number;
  };
}

export const getCreateTrackOptimisticResponse: MutationOptimisticResponseCreator<
  CreateTrackResponse,
  { songId: number; tempId: number }
> = ({ songId, tempId }) => ({
  __typename: 'CreateTrackResponse',
  createTrack: {
    track: {
      __typename: 'Track',
      id: tempId,
      sequences: [],
      position: 9999999999,
      song: {
        id: songId,
      },
      voice: {
        id: 1,
        name: 'Pulse',
        toneOscillatorType: 'pulse',
      },
      volume: 0,
    },
  },
});

export const CREATE_TRACK = gql`
  mutation CreateTrack($input: CreateTrackInput!) {
    createTrack(input: $input) {
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

export const useCreateTrack: MutationHook<
  CreateTrackResponse,
  CreateTrackVariables
> = (options) =>
  useMutation(
    CREATE_TRACK,
    merge(
      {
        update(cache, { data }) {
          if (!data) return;

          const {
            createTrack: { track },
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
                tracks: [...songResponse.song.tracks, track],
              },
            },
          });
        },
      } as MutationHookOptions<CreateTrackResponse, CreateTrackVariables>,
      options,
    ),
  );
