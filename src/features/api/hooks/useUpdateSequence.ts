import { gql, useMutation } from '@apollo/client';

import { Sequence } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongData } from './useGetSong';

export interface UpdateSequenceResponse {
  __typename: 'UpdateSequenceResponse';
  updateSequence: {
    sequence: Sequence;
  };
}

export interface UpdateSequenceVariables {
  input: {
    id: number;
    measureCount: number;
    position: number;
  };
}

export const UPDATE_SEQUENCE = gql`
  mutation UpdateSequence($input: UpdateSequenceInput!) {
    updateSequence(input: $input) {
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

export const getUpdateSequenceOptimisticResponse: MutationOptimisticResponseCreator<
  UpdateSequenceResponse,
  { updatedSequence: Sequence }
> = ({ updatedSequence }) => ({
  __typename: 'UpdateSequenceResponse',
  updateSequence: {
    sequence: updatedSequence,
  },
});

export const getUpdateSequenceMutationUpdater: MutationUpdaterFunctionCreator<
  UpdateSequenceResponse,
  UpdateSequenceVariables,
  { songId: number }
> = ({ songId }) => {
  return (cache, { data }) => {
    if (!data) return;

    const {
      updateSequence: { sequence },
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
                  sequences: track.sequences.map((existingSequence) =>
                    existingSequence.id === sequence.id
                      ? sequence
                      : existingSequence,
                  ),
                }
              : track,
          ),
        },
      },
    });
  };
};

export const useUpdateSequence: MutationHook<
  UpdateSequenceResponse,
  UpdateSequenceVariables
> = (options) => useMutation(UPDATE_SEQUENCE, options);
