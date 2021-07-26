import { gql } from '@apollo/client';
import { useMutation } from 'urql';

import { Track } from '../../../types';
import { MutationHook } from './types';

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
> = () => useMutation(CREATE_TRACK);
