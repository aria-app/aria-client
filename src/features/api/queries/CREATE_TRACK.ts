import { gql } from '@apollo/client';

import { Track } from '../../../types';

export interface CreateTrackResponse {
  createTrack: {
    success: boolean;
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
      success
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
