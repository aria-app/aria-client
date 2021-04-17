import { gql } from '@apollo/client';
import { Song } from '../../../types';

export interface CreateSongInput {
  name: string;
}

export interface CreateSongResponse {
  message: string;
  song: Song;
  success: boolean;
}

export const CREATE_SONG = gql`
  mutation CreateSong($input: CreateSongInput!) {
    createSong(input: $input) {
      song {
        updatedAt
        id
        name
        trackCount
      }
      success
    }
  }
`;
