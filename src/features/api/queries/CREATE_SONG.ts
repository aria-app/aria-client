import { gql } from '@apollo/client';

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
