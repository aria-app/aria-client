import { gql, useMutation } from '@apollo/client';
import { isEmpty } from 'lodash';

import { Note } from '../../../types';
import {
  MutationHook,
  MutationOptimisticResponseCreator,
  MutationUpdaterFunctionCreator,
} from './types';
import { GET_SONG, GetSongData } from './useGetSong';

export interface DuplicateNotesResponse {
  duplicateNotes: {
    notes: Note[];
  };
}

export interface DuplicateNotesVariables {
  ids: number[];
}

export const DUPLICATE_NOTES = gql`
  mutation DuplicateNotes($ids: [Int!]!) {
    duplicateNotes(ids: $ids) {
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

export const getDuplicateNotesOptimisticResponse: MutationOptimisticResponseCreator<
  DuplicateNotesResponse,
  { notesToDuplicate: Note[]; tempIds: number[] }
> = ({ notesToDuplicate, tempIds }) => ({
  __typename: 'DuplicateNotesResponse',
  duplicateNotes: {
    notes: notesToDuplicate.map((note, index) => ({
      ...note,
      id: tempIds[index],
    })),
  },
});

export const getDuplicateNotesMutationUpdater: MutationUpdaterFunctionCreator<
  DuplicateNotesResponse,
  DuplicateNotesVariables,
  { songId: number }
> = ({ songId }) => {
  return (cache, { data }) => {
    if (!data) return;

    const {
      duplicateNotes: { notes },
    } = data;

    if (isEmpty(notes)) return;

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
            sequences: track.sequences.map((sequence) =>
              sequence.id === notes[0].sequence.id
                ? {
                    ...sequence,
                    notes: [...sequence.notes, ...notes],
                  }
                : sequence,
            ),
          })),
        },
      },
    });
  };
};

export const useDuplicateNotes: MutationHook<
  DuplicateNotesResponse,
  DuplicateNotesVariables
> = (options) => useMutation(DUPLICATE_NOTES, options);
