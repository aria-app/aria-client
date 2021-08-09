import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { merge } from 'lodash';

import { Track } from '../../../types';
import { MutationHook, MutationOptimisticResponseCreator } from './types';
import { GET_SONG, GetSongData } from './useGetSong';

export interface CreateTrackData {
  createTrack: {
    __typename: 'CreateTrackResponse';
    track: Omit<Track, 'isMuted' | 'isSoloing'>;
  };
}

export interface CreateTrackVariables {
  input: {
    songId: number;
  };
}

export const getCreateTrackOptimisticResponse: MutationOptimisticResponseCreator<
  CreateTrackData,
  { songId: number; tempId: number }
> = ({ songId, tempId }) => ({
  createTrack: {
    __typename: 'CreateTrackResponse',
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
  CreateTrackData,
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
                tracks: [...songData.song.tracks, track],
              },
            },
          });
        },
      } as MutationHookOptions<CreateTrackData, CreateTrackVariables>,
      options,
    ),
  );
