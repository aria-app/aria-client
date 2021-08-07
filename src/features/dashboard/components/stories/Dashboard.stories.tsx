import { Meta, Story } from '@storybook/react';
import { formatISO } from 'date-fns/esm';
import { orderBy, partition, uniqueId } from 'lodash';
import { graphql } from 'msw';
import { MemoryRouter, Route, Switch } from 'react-router-dom';

import * as fixtures from '../../../../fixtures';
import {
  ClientProvider,
  CreateSongResponse,
  CreateSongVariables,
  DeleteSongResponse,
  DeleteSongVariables,
  GetSongsResponse,
  GetSongsVariables,
  LogoutResponse,
  LogoutVariables,
  MeResponse,
  MeVariables,
} from '../../../api';
import { AuthProvider } from '../../../auth';
import { Shell } from '../../../shared';
import { Dashboard } from '../Dashboard';

const state = {
  songs: fixtures.songListSongs,
};

export default {
  component: Dashboard,
  title: 'Dashboard/Dashboard',
  parameters: {
    layout: 'fullscreen',
    msw: [
      graphql.mutation<CreateSongResponse, CreateSongVariables>(
        'CreateSong',
        (req, res, ctx) => {
          const {
            input: { name },
          } = req.variables;

          if (name === 'Fail') {
            return res.networkError('Failed to connect');
          }

          if (state.songs.some((song) => song.name === name)) {
            return res(
              ctx.errors([
                {
                  message:
                    'You already have a song with that name. Please select another.',
                },
              ]),
            );
          }

          const newSong = {
            __typename: 'Song',
            id: parseInt(uniqueId()) || -1,
            name,
            updatedAt: formatISO(Date.now()),
          };
          state.songs = [...state.songs, newSong];

          return res(
            ctx.data({
              createSong: {
                song: newSong,
              },
            }),
          );
        },
      ),
      graphql.mutation<DeleteSongResponse, DeleteSongVariables>(
        'DeleteSong',
        (req, res, ctx) => {
          const { id } = req.variables;

          const [deletedSongs, songsWithoutDeleted] = partition(
            state.songs,
            (song) => song.id === id,
          );

          state.songs = songsWithoutDeleted;

          return res(
            ctx.data<DeleteSongResponse>({
              deleteSong: {
                song: deletedSongs[0],
              },
            }),
          );
        },
      ),
      graphql.query<GetSongsResponse, GetSongsVariables>(
        'GetSongs',
        (req, res, ctx) =>
          res(
            ctx.data({
              songs: {
                __typename: 'SongsResponse',
                data: orderBy(
                  state.songs,
                  req.variables.sort,
                  req.variables.sortDirection,
                ),
                meta: {
                  __typename: 'PaginationMetadata',
                  currentPage: 1,
                  itemsPerPage: 10,
                  totalItemCount: 2,
                },
              },
            }),
          ),
      ),
      graphql.mutation<LogoutResponse, LogoutVariables>(
        'Logout',
        (req, res, ctx) =>
          res(
            ctx.data({
              logout: {
                success: true,
              },
            }),
          ),
      ),
      graphql.query<MeResponse, MeVariables>('Me', (req, res, ctx) =>
        res(
          ctx.data({
            me: fixtures.user,
          }),
        ),
      ),
    ],
  },
} as Meta;

export const Default: Story<any> = (args) => (
  <ClientProvider>
    <AuthProvider>
      <MemoryRouter initialEntries={['/']}>
        <Shell>
          <Switch>
            <Route path="/">
              <Dashboard {...args} />
            </Route>
          </Switch>
        </Shell>
      </MemoryRouter>
    </AuthProvider>
  </ClientProvider>
);
