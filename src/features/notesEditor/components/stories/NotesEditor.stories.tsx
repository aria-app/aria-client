import { Meta, Story } from '@storybook/react';
import { Toolbar } from 'aria-ui';
import { compact, partition, uniqueId } from 'lodash';
import { graphql } from 'msw';
import { FC, ProviderProps, useRef } from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';

import { Dawww } from '../../../../dawww';
import * as fixtures from '../../../../fixtures';
import { I18NWrapper } from '../../../../i18n';
import { Note } from '../../../../types';
import {
  ClientProvider,
  CreateNoteResponse,
  CreateNoteVariables,
  DeleteNotesResponse,
  DeleteNotesVariables,
  DuplicateNotesResponse,
  DuplicateNotesVariables,
  GetSongResponse,
  GetSongVariables,
  UpdateNotesResponse,
  UpdateNotesVariables,
} from '../../../api';
import { AudioManagerContext } from '../../../audio/contexts';
import { Shell } from '../../../shared';
import { NotesEditor } from '../NotesEditor';

const state = {
  sequence: fixtures.song.tracks[0].sequences[0],
  song: fixtures.song,
};

export default {
  component: NotesEditor,
  title: 'NotesEditor/NotesEditor',
  parameters: {
    layout: 'fullscreen',
    msw: [
      graphql.mutation<CreateNoteResponse, CreateNoteVariables>(
        'CreateNote',
        (req, res, ctx) => {
          const {
            input: { points },
          } = req.variables;

          const newNote = {
            id: parseInt(uniqueId()),
            points,
            sequence: {
              id: state.sequence.id,
            },
          };

          state.sequence = {
            ...state.sequence,
            notes: [...state.sequence.notes, newNote],
          };

          return res(
            ctx.data<CreateNoteResponse>({
              __typename: 'CreateNoteResponse',
              createNote: {
                note: newNote,
              },
            }),
          );
        },
      ),
      graphql.mutation<DeleteNotesResponse, DeleteNotesVariables>(
        'DeleteNotes',
        (req, res, ctx) => {
          const { ids } = req.variables;

          const [deletedNotes, notesWithoutDeleted] = partition(
            state.sequence.notes,
            (note) => ids.includes(note.id),
          );

          state.sequence = {
            ...state.sequence,
            notes: notesWithoutDeleted,
          };

          return res(
            ctx.data<DeleteNotesResponse>({
              __typename: 'DeleteNotesResponse',
              deleteNotes: {
                notes: deletedNotes,
              },
            }),
          );
        },
      ),
      graphql.mutation<DuplicateNotesResponse, DuplicateNotesVariables>(
        'DuplicateNotes',
        (req, res, ctx) => {
          const { ids } = req.variables;

          const notesToDuplicate = ids.map((id) =>
            state.sequence.notes.find((note) => note.id === id),
          );

          if (notesToDuplicate.some((note) => note === undefined)) {
            return res(
              ctx.errors([
                { message: 'Could not duplicate the requested notes.' },
              ]),
            );
          }

          const newNotes = (notesToDuplicate as Note[]).map((note) => ({
            ...note,
            id: parseInt(uniqueId()),
          }));

          state.sequence = {
            ...state.sequence,
            notes: [...state.sequence.notes, ...newNotes],
          };

          return res(
            ctx.data<DuplicateNotesResponse>({
              duplicateNotes: {
                notes: newNotes,
              },
            }),
          );
        },
      ),
      graphql.query<GetSongResponse, GetSongVariables>(
        'GetSong',
        (req, res, ctx) => {
          return res(
            ctx.data<GetSongResponse>({
              song: state.song,
            }),
          );
        },
      ),
      graphql.mutation<UpdateNotesResponse, UpdateNotesVariables>(
        'UpdateNotes',
        (req, res, ctx) => {
          const {
            input: { notes },
          } = req.variables;

          const updatedNotes: (Note | undefined)[] = notes.map((update) => {
            const existingNote = state.sequence.notes.find(
              (note) => note.id === update.id,
            );

            return existingNote
              ? { ...existingNote, points: update.points }
              : existingNote;
          });

          if (updatedNotes.some((note) => note === undefined)) {
            return res(
              ctx.errors([
                { message: 'Could not update the requested notes.' },
              ]),
            );
          }

          state.sequence = {
            ...state.sequence,
            notes: state.sequence.notes.map(
              (note) =>
                compact(updatedNotes).find(({ id }) => id === note.id) || note,
            ),
          };

          return res(
            ctx.data<UpdateNotesResponse>({
              updateNotes: {
                notes: compact(updatedNotes),
              },
            }),
          );
        },
      ),
    ],
  },
} as Meta;

const MockAudioProvider: FC<Partial<ProviderProps<any>>> = (props) => {
  const audioManager = useRef({
    ...Dawww({}),
    preview: () => {},
    updateSequence: () => {},
  });

  return (
    <AudioManagerContext.Provider value={audioManager.current} {...props} />
  );
};

export const Default: Story<any> = (args) => (
  <ClientProvider>
    <MockAudioProvider>
      <I18NWrapper>
        <MemoryRouter initialEntries={['/100/100']}>
          <Shell>
            <Toolbar />
            <Switch>
              <Route path="/:songId/:sequenceId">
                <NotesEditor {...args} />
              </Route>
            </Switch>
          </Shell>
        </MemoryRouter>
      </I18NWrapper>
    </MockAudioProvider>
  </ClientProvider>
);
