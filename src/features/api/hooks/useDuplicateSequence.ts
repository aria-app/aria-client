import { gql, useMutation } from '@apollo/client';

import { Sequence } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongData } from './useGetSong';

export interface DuplicateSequenceData {
  duplicateSequence: {
    __typename: 'DuplicateSequenceResponse';
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
  DuplicateSequenceData,
  { sequenceToDuplicate: Sequence; tempId: number }
> = ({ sequenceToDuplicate, tempId }) => ({
  duplicateSequence: {
    __typename: 'DuplicateSequenceResponse',
    sequence: {
      ...sequenceToDuplicate,
      id: tempId,
    },
  },
});

export const getDuplicateSequenceMutationUpdater: MutationUpdaterFunctionCreator<
  DuplicateSequenceData,
  DuplicateSequenceVariables,
  { songId: number }
> = ({ songId }) => {
  return (cache, { data }) => {
    if (!data) return;

    const {
      duplicateSequence: { sequence },
    } = data;

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
          tracks: songData.song.tracks.map((track) =>
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
  DuplicateSequenceData,
  DuplicateSequenceVariables
> = (options) => useMutation(DUPLICATE_SEQUENCE, options);
