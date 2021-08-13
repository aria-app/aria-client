import { gql, useMutation } from '@apollo/client';

import { Song } from '../../../types';
import { MutationHook, MutationOptimisticResponseCreator } from './types';

export interface UpdateSongData {
  updateSong: {
    __typename: 'UpdateSongResponse';
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
  UpdateSongData,
  { updatedSong: Song }
> = ({ updatedSong }) => ({
  updateSong: {
    __typename: 'UpdateSongResponse',
    song: updatedSong,
  },
});

export const useUpdateSong: MutationHook<UpdateSongData, UpdateSongVariables> =
  (options) => useMutation(UPDATE_SONG, options);
