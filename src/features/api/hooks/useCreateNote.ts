import { gql, useMutation } from '@apollo/client';

import { Note, Point } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongData } from './useGetSong';

export interface CreateNoteData {
  createNote: {
    __typename: 'CreateNoteResponse';
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
  CreateNoteData,
  {
    points: Point[];
    sequenceId: number;
    tempId: number;
  }
> = ({ tempId, points, sequenceId }) => ({
  createNote: {
    __typename: 'CreateNoteResponse',
    note: {
      __typename: 'Note',
      id: tempId,
      points,
      sequence: {
        __typename: 'Sequence',
        id: sequenceId,
      },
    },
  },
});

export const getCreateNoteMutationUpdater: MutationUpdaterFunctionCreator<
  CreateNoteData,
  CreateNoteVariables,
  { songId: number }
> = ({ songId }) => {
  return (cache, { data }) => {
    if (!data) return;

    const {
      createNote: { note },
    } = data;

    const songData = cache.readQuery<GetSongData>({
      query: GET_SONG,
      variables: { id: songId },
    });

    if (!songData) return;

    const updatedSong = {
      ...songData.song,
      tracks: songData.song.tracks.map((track) => ({
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

export const useCreateNote: MutationHook<CreateNoteData, CreateNoteVariables> =
  (options) => useMutation(CREATE_NOTE, options);
