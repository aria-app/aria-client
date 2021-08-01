import { gql, useMutation } from '@apollo/client';

import { Sequence } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongResponse } from './useGetSong';

export interface DuplicateSequenceResponse {
  duplicateSequence: {
    sequence: Sequence;
  };
}

export type DuplicateSequenceVariables = {
  id: number;
};

export const DUPLICATE_SEQUENCE = gql`
  mutation DuplicateSequence($id: Int!) {
    duplicateSequence(id: $id) {
      sequence {
        id
        measureCount
        notes {
          id
          points {
            x
            y
          }
          sequence {
            id
          }
        }
        position
        track {
          id
        }
      }
    }
  }
`;

export const getDuplicateSequenceOptimisticResponse: MutationOptimisticResponseCreator<
  DuplicateSequenceResponse,
  { sequenceToDuplicate: Sequence; tempId: number }
> = ({ sequenceToDuplicate, tempId }) => ({
  __typename: 'DuplicateSequenceResponse',
  duplicateSequence: {
    sequence: {
      ...sequenceToDuplicate,
      id: tempId,
    },
  },
});

export const getDuplicateSequenceMutationUpdater: MutationUpdaterFunctionCreator<
  DuplicateSequenceResponse,
  DuplicateSequenceVariables,
  { songId: number }
> = ({ songId }) => {
  return (cache, { data }) => {
    if (!data) return;

    const {
      duplicateSequence: { sequence },
    } = data;

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
          tracks: songResponse.song.tracks.map((track) =>
            track.id === sequence.track.id
              ? {
                  ...track,
                  sequences: [...track.sequences, sequence],
                }
              : track,
          ),
        },
      },
    });
  };
};

export const useDuplicateSequence: MutationHook<
  DuplicateSequenceResponse,
  DuplicateSequenceVariables
> = (options) => useMutation(DUPLICATE_SEQUENCE, options);
