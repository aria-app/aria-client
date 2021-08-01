import { gql, useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

import { Note } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongResponse } from './useGetSong';

export interface UpdateNotesResponse {
  updateNotes: {
    notes: Note[];
  };
}

export interface UpdateNotesVariables {
  input: {
    notes: Note[];
  };
}

export const UPDATE_NOTES = gql`
  mutation UpdateNotes($input: UpdateNotesInput!) {
    updateNotes(input: $input) {
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
    }
  }
`;

export const getUpdateNotesOptimisticResponse: MutationOptimisticResponseCreator<
  UpdateNotesResponse,
  UpdateNotesVariables
> = ({ input: { notes } }) => ({
  __typename: 'UpdateNotesResponse',
  updateNotes: {
    notes,
  },
});

export const getUpdateNotesMutationUpdater: MutationUpdaterFunctionCreator<
  UpdateNotesResponse,
  UpdateNotesVariables,
  { songId: number }
> = (variables, { songId }) => {
  return (cache, { data }) => {
    if (!data) return;

    const {
      updateNotes: { notes },
    } = data;

    if (isEmpty(notes)) return;

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
            sequences: track.sequences.map((sequence) =>
              sequence.id === notes[0].sequence.id
                ? {
                    ...sequence,
                    notes: sequence.notes.map(
                      (existingNote) =>
                        notes.find((note) => note.id === existingNote.id) ||
                        existingNote,
                    ),
                  }
                : sequence,
            ),
          })),
        },
      },
    });
  };
};

export const useUpdateNotes: MutationHook<
  UpdateNotesResponse,
  UpdateNotesVariables
> = (options) => useMutation(UPDATE_NOTES, options);
