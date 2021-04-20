import { gql } from '@apollo/client';

import { Song } from '../../../types';

export interface UpdateSongInput {
  bpm?: number;
  id: number;
  measureCount?: number;
  name?: string;
}

export interface UpdateSongResponse {
  message: string;
  song: Song;
  success: boolean;
}

export const UPDATE_SONG = gql`
  mutation UpdateSong($input: UpdateSongInput!) {
    updateSong(input: $input) {
      message
      song {
        bpm
        updatedAt
        id
        measureCount
        name
      }
      success
    }
  }
`;
