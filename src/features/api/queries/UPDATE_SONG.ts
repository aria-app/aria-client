import { gql } from '@apollo/client';

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
