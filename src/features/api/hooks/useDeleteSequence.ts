import { gql, useMutation } from '@apollo/client';

import { Minimal, Sequence } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongData } from './useGetSong';

export interface DeleteSequenceData {
  deleteSequence: {
    __typename: 'DeleteSequenceResponse';
    sequence: Minimal<Sequence>;
  };
}

export interface DeleteSequenceVariables {
  id: number;
}

export const DELETE_SEQUENCE = gql`
  mutation DeleteSequence($id: Int!) {
    deleteSequence(id: $id) {
      sequence {
        id
      }
    }
  }
`;

export const getDeleteSequenceOptimisticResponse: MutationOptimisticResponseCreator<
  DeleteSequenceData,
  { sequenceToDelete: Sequence }
> = ({ sequenceToDelete }) => ({
  deleteSequence: {
    __typename: 'DeleteSequenceResponse',
    sequence: sequenceToDelete,
  },
});

export const getDeleteSequenceMutationUpdater: MutationUpdaterFunctionCreator<
  DeleteSequenceData,
  DeleteSequenceVariables,
  { songId: number }
> =
  ({ songId }) =>
  (cache, { data }, { variables = {} }) => {
    if (!data) return;

    const { id } = variables;

    const songData = cache.readQuery<GetSongData>({
      query: GET_SONG,
      variables: { id: songId },
    });

    if (!songData) return;

    cache.writeQuery({
      query: GET_SONG,
      data: {
        song: {
          ...songData.song,
          tracks: songData.song.tracks.map((track) => ({
            ...track,
            sequences: track.sequences.filter(
              (existingSequence) => existingSequence.id !== id,
            ),
          })),
        },
      },
    });
  };

export const useDeleteSequence: MutationHook<
  DeleteSequenceData,
  DeleteSequenceVariables
> = (options) => useMutation(DELETE_SEQUENCE, options);
