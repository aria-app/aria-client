import { useMemo } from 'react';
import { gql, useQuery } from 'urql';

import { Voice } from '../../../types';
import { UrqlQueryHook } from './types';

export interface GetVoicesResponse {
  voices: Voice[];
}

export type GetVoicesVariables = Record<string, never>;

export const GET_VOICES = gql<GetVoicesResponse, GetVoicesVariables>`
  query GetVoices {
    voices {
      id
      name
      toneOscillatorType
    }
  }
`;

export const useGetVoices: UrqlQueryHook<
  GetVoicesResponse,
  GetVoicesVariables
> = (args) => {
  const context = useMemo(() => ({ additionalTypenames: ['Voice'] }), []);

  return useQuery({
    context,
    query: GET_VOICES,
    ...args,
  });
};
