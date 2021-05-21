import { gql } from '@apollo/client';

import { Song } from '../../../types';

export interface GetSongInput {
  id: number;
}

export interface GetSongResponse {
  song: Song | null;
}

export const GET_SONG = gql`
  query GetSong($id: Int!) {
    song(id: $id) {
      bpm
      id
      measureCount
      name
      trackCount
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
