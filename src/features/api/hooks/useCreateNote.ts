import { gql, useMutation } from '@apollo/client';

import { Note, Point } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongResponse } from './useGetSong';

export interface CreateNoteResponse {
  createNote: {
    note: Note;
  };
}

export interface CreateNoteVariables {
  input: {
    points: Point[];
    sequenceId: number;
  };
}

export const CREATE_NOTE = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      note {
        id
        points {
          x
          y
        }
        sequence {
          id
        }
      }
    }
  }
`;

export const getCreateNoteOptimisticResponse: MutationOptimisticResponseCreator<
  CreateNoteResponse,
  {
    points: Point[];
    sequenceId: number;
    tempId: number;
  }
> = ({ tempId, points, sequenceId }) => ({
  __typename: 'CreateNoteResponse',
  createNote: {
    note: {
      __typename: 'Note',
      id: tempId,
      points,
      sequence: {
        id: sequenceId,
      },
    },
  },
});

export const getCreateNoteMutationUpdater: MutationUpdaterFunctionCreator<
  CreateNoteResponse,
  CreateNoteVariables,
  { songId: number }
> = (variables, { songId }) => {
  return (cache, { data }) => {
    if (!data) return;

    const {
      createNote: { note },
    } = data;

    const songResponse = cache.readQuery<GetSongResponse>({
      query: GET_SONG,
      variables: { id: songId },
    });

    if (!songResponse) return;

    const updatedSong = {
      ...songResponse.song,
      tracks: songResponse.song.tracks.map((track) => ({
        ...track,
        sequences: track.sequences.map((sequence) =>
          sequence.id === note.sequence.id
            ? {
                ...sequence,
                notes: [...sequence.notes, note],
              }
            : sequence,
        ),
      })),
    };

    cache.writeQuery({
      query: GET_SONG,
      data: {
        song: updatedSong,
      },
    });
  };
};

export const useCreateNote: MutationHook<
  CreateNoteResponse,
  CreateNoteVariables
> = (options) => useMutation(CREATE_NOTE, options);
