import { gql } from '@apollo/client';

export const GET_VOICES = gql`
  query GetVoices {
    voices {
      id
      name
      toneOscillatorType
    }
  }
`;
