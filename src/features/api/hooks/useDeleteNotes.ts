import { gql, useMutation } from '@apollo/client';

import { Note } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongData } from './useGetSong';

export interface DeleteNotesData {
  deleteNotes: {
    __typename: 'DeleteNotesResponse';
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
  DeleteNotesData,
  { notesToDelete: Note[] }
> = ({ notesToDelete }) => ({
  deleteNotes: {
    __typename: 'DeleteNotesResponse',
    notes: notesToDelete,
  },
});

export const getDeleteNotesMutationUpdater: MutationUpdaterFunctionCreator<
  DeleteNotesData,
  DeleteNotesVariables,
  { songId: number }
> = ({ songId }) => {
  return (cache, { data }, { variables = {} }) => {
    if (!data) return;

    const { ids = [] } = variables;

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
  DeleteNotesData,
  DeleteNotesVariables
> = (options) => useMutation(DELETE_NOTES, options);
