import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { merge } from 'lodash';

import { MutationHook, MutationUpdaterFunctionCreator } from './types';
import { GET_SONG, GetSongResponse } from './useGetSong';

export interface DeleteSequenceResponse {
  __typename: 'DeleteSequenceResponse';
  deleteSequence: {
    success: boolean;
  };
}

export interface DeleteSequenceVariables {
  id: number;
}

export const DELETE_SEQUENCE = gql`
  mutation DeleteSequence($id: Int!) {
    deleteSequence(id: $id) {
      success
    }
  }
`;

export const getDeleteSequenceMutationUpdater: MutationUpdaterFunctionCreator<
  DeleteSequenceResponse,
  DeleteSequenceVariables,
  { songId: number }
> = ({ songId }) => {
  return (cache, { data }, { variables = {} }) => {
    if (!data) return;

    const { id } = variables;

    const songResponse = cache.readQuery<GetSongResponse>({
      query: GET_SONG,
      variables: { id: songId },
    });

    if (!songResponse) return;

    cache.writeQuery({
      query: GET_SONG,
      data: {
        song: {
          ...songResponse.song,
          tracks: songResponse.song.tracks.map((track) => ({
            ...track,
            sequences: track.sequences.filter(
              (existingSequence) => existingSequence.id !== id,
            ),
          })),
        },
      },
    });
  };
};

export const useDeleteSequence: MutationHook<
  DeleteSequenceResponse,
  DeleteSequenceVariables
> = (options) =>
  useMutation(
    DELETE_SEQUENCE,
    merge(
      {
        optimisticResponse: {
          __typename: 'DeleteSequenceResponse',
          deleteSequence: {
            success: true,
          },
        },
      } as MutationHookOptions<DeleteSequenceResponse, DeleteSequenceVariables>,
      options,
    ),
  );
