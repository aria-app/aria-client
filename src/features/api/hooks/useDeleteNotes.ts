import { gql, useMutation } from '@apollo/client';

import { Note } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongResponse } from './useGetSong';

export interface DeleteNotesResponse {
  __typename: 'DeleteNotesResponse';
  deleteNotes: {
    notes: Note[];
  };
}

export interface DeleteNotesVariables {
  ids: number[];
}

export const DELETE_NOTES = gql`
  mutation DeleteNotes($ids: [Int!]!) {
    deleteNotes(ids: $ids) {
      notes {
        id
      }
    }
  }
`;

export const getDeleteNotesOptimisticUpdate: MutationOptimisticResponseCreator<
  DeleteNotesResponse,
  { notesToDelete: Note[] }
> = ({ notesToDelete }) => ({
  __typename: 'DeleteNotesResponse',
  deleteNotes: {
    notes: notesToDelete,
  },
});

export const getDeleteNotesMutationUpdater: MutationUpdaterFunctionCreator<
  DeleteNotesResponse,
  DeleteNotesVariables,
  { songId: number }
> = ({ songId }) => {
  return (cache, { data }, { variables = {} }) => {
    if (!data) return;

    const { ids = [] } = variables;

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
            sequences: track.sequences.map((sequence) => ({
              ...sequence,
              notes: sequence.notes.filter((note) => !ids.includes(note.id)),
            })),
          })),
        },
      },
    });
  };
};

export const useDeleteNotes: MutationHook<
  DeleteNotesResponse,
  DeleteNotesVariables
> = (options) => useMutation(DELETE_NOTES, options);
