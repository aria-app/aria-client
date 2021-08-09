import { gql, useQuery } from '@apollo/client';

import { Song } from '../../../types';
import { QueryHook } from './types';

export interface GetSongData {
  song: Song;
}

export interface GetSongVariables {
  id: number;
}

export const GET_SONG = gql`
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
      updatedAt
      user {
        id
      }
    }
  }
`;

export const useGetSong: QueryHook<GetSongData, GetSongVariables> = (options) =>
  useQuery(GET_SONG, options);
