import { gql, useQuery } from '@apollo/client';

import { Voice } from '../../../types';
import { QueryHook } from './types';

export interface GetVoicesResponse {
  voices: Voice[];
}

export type GetVoicesVariables = Record<string, never>;

export const GET_VOICES = gql`
  query GetVoices {
    voices {
      id
      name
      toneOscillatorType
    }
  }
`;

export const useGetVoices: QueryHook<GetVoicesResponse, GetVoicesVariables> = (
  options,
) => useQuery(GET_VOICES, options);
