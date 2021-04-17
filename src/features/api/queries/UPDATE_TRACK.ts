import { gql } from '@apollo/client';
import { Track } from '../../../types';

export interface UpdateTrackInput {
  id: number;
  voiceId: number;
  volume: number;
}

export interface UpdateTrackResponse {
  message: string;
  track: Track;
  success: boolean;
}

export const UPDATE_TRACK = gql`
  mutation UpdateTrack($input: UpdateTrackInput!) {
    updateTrack(input: $input) {
      track {
        id
        position
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
      success
    }
  }
`;
