import { gql } from '@apollo/client';

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
