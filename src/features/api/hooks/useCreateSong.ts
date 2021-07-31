import { gql, useMutation } from '@apollo/client';
import { merge } from 'lodash';

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
> = (options) => useMutation(CREATE_SONG, merge({}, options));
