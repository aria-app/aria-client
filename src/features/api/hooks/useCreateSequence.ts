import { gql, useMutation } from '@apollo/client';

import { Sequence } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongResponse } from './useGetSong';

export interface CreateSequenceResponse {
  __typename: 'CreateSequenceResponse';
  createSequence: {
    sequence: Sequence;
  };
}

export interface CreateSequenceVariables {
  input: {
    position: number;
    trackId: number;
  };
}

export const CREATE_SEQUENCE = gql`
  mutation CreateSequence($input: CreateSequenceInput!) {
    createSequence(input: $input) {
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

export const getCreateSequenceOptimisticResponse: MutationOptimisticResponseCreator<
  CreateSequenceResponse,
  {
    position: number;
    tempId: number;
    trackId: number;
  }
> = ({ position, tempId, trackId }) => ({
  __typename: 'CreateSequenceResponse',
  createSequence: {
    sequence: {
      __typename: 'Sequence',
      id: tempId,
      measureCount: 1,
      notes: [],
      position,
      track: {
        id: trackId,
      },
    },
  },
});

export const getCreateSequenceMutationUpdater: MutationUpdaterFunctionCreator<
  CreateSequenceResponse,
  CreateSequenceVariables,
  { songId: number }
> = (variables, { songId }) => {
  return (cache, { data }) => {
    if (!data) return;

    const {
      createSequence: { sequence },
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

export const useCreateSequence: MutationHook<
  CreateSequenceResponse,
  CreateSequenceVariables
> = (options) => useMutation(CREATE_SEQUENCE, options);
