import { gql, useQuery } from '@apollo/client';

import { PaginatedResponse, Voice } from '../../../types';
import { QueryHook } from './types';

export interface GetVoicesData {
  voices: PaginatedResponse<Voice, 'VoicesResponse'>;
}

export interface GetVoicesVariables {
  sort: keyof Voice;
  sortDirection?: 'asc' | 'desc';
}

export const GET_VOICES = gql`
  query GetVoices {
    voices {
      data {
        id
        name
        toneOscillatorType
      }
    }
  }
`;

export const useGetVoices: QueryHook<GetVoicesData, GetVoicesVariables> = (
  options,
) => useQuery(GET_VOICES, options);
