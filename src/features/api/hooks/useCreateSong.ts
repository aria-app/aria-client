import { gql } from '@apollo/client';
import { useMutation } from 'urql';

import { Song } from '../../../types';
import { MutationHook } from './types';

export interface CreateSongVariables {
  input: {
    name: string;
  };
}

export interface CreateSongResponse {
  createSong: {
    song: Pick<Song, 'id' | 'name' | 'updatedAt'>;
  };
}

export const CREATE_SONG = gql`
  mutation CreateSong($input: CreateSongInput!) {
    createSong(input: $input) {
      song {
        id
        name
        updatedAt
      }
    }
  }
`;

export const useCreateSong: MutationHook<
  CreateSongResponse,
  CreateSongVariables
> = () => useMutation(CREATE_SONG);
