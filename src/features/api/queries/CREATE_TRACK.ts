import { gql } from '@apollo/client';

import { Track } from '../../../types';

export interface CreateTrackInput {
  songId: number;
}

export interface CreateTrackResponse {
  message: string;
  success: boolean;
  track: Track;
}

export const CREATE_TRACK = gql`
  mutation CreateTrack($input: CreateTrackInput!) {
    createTrack(input: $input) {
      message
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
