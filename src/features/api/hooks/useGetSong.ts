import { useMemo } from 'react';
import { gql, useQuery } from 'urql';

import { Song } from '../../../types';
import { UrqlQueryHook } from './types';

export interface GetSongResponse {
  song: Song;
}

export interface GetSongVariables {
  id: number;
}

export const GET_SONG = gql<GetSongResponse, GetSongVariables>`
  query GetSong($id: Int!) {
    song(id: $id) {
      bpm
      createdAt
      id
      measureCount
      name
      tracks {
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
      updatedAt
      user {
        id
      }
    }
  }
`;

export const useGetSong: UrqlQueryHook<GetSongResponse, GetSongVariables> = (
  args,
) => {
  const context = useMemo(() => ({ additionalTypenames: ['Song'] }), []);

  return useQuery({
    context,
    query: GET_SONG,
    ...args,
  });
};
