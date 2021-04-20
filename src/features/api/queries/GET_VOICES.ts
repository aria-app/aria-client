import { gql } from '@apollo/client';

import { Voice } from '../../../types';

export interface GetVoicesResponse {
  voices: Voice[];
}

export const GET_VOICES = gql`
  query GetVoices {
    voices {
      id
      name
      toneOscillatorType
    }
  }
`;
