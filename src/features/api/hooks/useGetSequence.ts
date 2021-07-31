import { useMemo } from 'react';
import { gql, useQuery } from 'urql';

import { Sequence } from '../../../types';
import { UrqlQueryHook } from './types';

export interface GetSequenceResponse {
  sequence: Sequence;
}

export interface GetSequenceVariables {
  id: number;
}

export const GET_SEQUENCE = gql<GetSequenceResponse, GetSequenceVariables>`
  query GetSequence($id: Int!) {
    sequence(id: $id) {
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
  }
`;

export const useGetSequence: UrqlQueryHook<
  GetSequenceResponse,
  GetSequenceVariables
> = (args) => {
  const context = useMemo(() => ({ additionalTypenames: ['Sequence'] }), []);

  return useQuery({
    context,
    query: GET_SEQUENCE,
    ...args,
  });
};
