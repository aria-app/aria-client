import { gql, useMutation } from '@apollo/client';

import { Song } from '../../../types';
import { MutationHook, MutationOptimisticResponseCreator } from './types';

export interface UpdateSongResponse {
  __typename: 'UpdateSongResponse';
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

export const UPDATE_SONG = gql`
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

export const getUpdateSongOptimisticResponse: MutationOptimisticResponseCreator<
  UpdateSongResponse,
  UpdateSongVariables,
  { updatedSong: Song }
> = (variables, { updatedSong }) => ({
  __typename: 'UpdateSongResponse',
  updateSong: {
    song: updatedSong,
  },
});

export const useUpdateSong: MutationHook<
  UpdateSongResponse,
  UpdateSongVariables
> = (options) => useMutation(UPDATE_SONG, options);
