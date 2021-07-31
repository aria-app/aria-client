import { gql, useMutation } from 'urql';

import { Track } from '../../../types';
import { UrqlMutationHook } from './types';

export interface CreateTrackResponse {
  createTrack: {
    track: Omit<Track, 'isMuted' | 'isSoloing' | 'song'>;
  };
}

export interface CreateTrackVariables {
  input: {
    songId: number;
  };
}

export const CREATE_TRACK = gql<CreateTrackResponse, CreateTrackVariables>`
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

export const useCreateTrack: UrqlMutationHook<
  CreateTrackResponse,
  CreateTrackVariables
> = () => useMutation(CREATE_TRACK);
