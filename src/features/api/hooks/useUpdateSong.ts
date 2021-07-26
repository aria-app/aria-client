import { gql, useMutation } from 'urql';

import { Song } from '../../../types';
import { MutationHook } from './types';

export interface UpdateSongResponse {
  updateSong: {
    song: Song;
  };
}

export interface UpdateSongVariables {
  input: {
    bpm?: number;
    id: number;
    measureCount?: number;
    name?: string;
  };
}

export const UPDATE_SONG = gql<UpdateSongResponse, UpdateSongVariables>`
  mutation UpdateSong($input: UpdateSongInput!) {
    updateSong(input: $input) {
      song {
        bpm
        updatedAt
        id
        measureCount
        name
      }
    }
  }
`;

export const useUpdateSong: MutationHook<
  UpdateSongResponse,
  UpdateSongVariables
> = () => useMutation(UPDATE_SONG);
