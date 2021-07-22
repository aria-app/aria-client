import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Meta, Story } from '@storybook/react';
import { formatISO } from 'date-fns/esm';
import { orderBy, uniqueId } from 'lodash';
import { graphql } from 'msw';
import { MemoryRouter, Route, Switch } from 'react-router-dom';

import { UrqlWrapper } from '../../../../UrqlWrapper';
import {
  CreateSongResponse,
  CreateSongVariables,
  DeleteSongResponse,
  DeleteSongVariables,
  GetSongsResponse,
  GetSongsVariables,
  LOGOUT,
  LogoutResponse,
  ME,
  MeResponse,
} from '../../../api';
import { AuthProvider } from '../../../auth';
import { Dashboard } from '../Dashboard';

const state = {
  songs: [
    {
      __typename: 'Song',
      id: parseInt(uniqueId()),
      name: 'Song 1',
      updatedAt: '2021-01-01',
    },
    {
      __typename: 'Song',
      id: parseInt(uniqueId()),
      name: 'Song 2',
      updatedAt: '2021-04-02',
    },
  ],
};

export default {
  component: Dashboard,
  title: 'Dashboard/Dashboard',
  parameters: {
    layout: 'fullscreen',
    msw: [
      graphql.query('IntrospectionQuery', (req, res, ctx) => res(ctx.data({}))),
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
                message: 'Song was created.',
                song: newSong,
                success: true,
              },
            }),
          );
        },
      ),
      graphql.mutation<DeleteSongResponse, DeleteSongVariables>(
        'DeleteSong',
        (req, res, ctx) => {
          const { id } = req.variables;

          state.songs = state.songs.filter((song) => song.id !== id);

          return res(
            ctx.data({
              deleteSong: {
                success: true,
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
                data: orderBy(
                  state.songs,
                  req.variables.sort,
                  req.variables.sortDirection,
                ),
                meta: {
                  currentPage: 1,
                  itemsPerPage: 10,
                  totalItemCount: 2,
                },
              },
            }),
          ),
      ),
    ],
  },
} as Meta;

const mocks: MockedResponse<Record<string, any>>[] = [
  {
    request: {
      query: LOGOUT,
    },
    result: {
      data: {
        logout: {
          success: true,
        },
      } as LogoutResponse,
    },
  },
  {
    request: {
      query: ME,
    },
    result: {
      data: {
        me: {
          createdAt: '2020-01-01T00:00:00Z',
          email: 'user@ariaapp.io',
          firstName: 'Yorick',
          id: 1,
          lastName: 'User',
        },
      } as MeResponse,
    },
  },
];

export const Default: Story<any> = (args) => (
  <UrqlWrapper>
    <MockedProvider mocks={mocks}>
      <AuthProvider>
        <MemoryRouter initialEntries={['/']}>
          <Switch>
            <Route path="/">
              <Dashboard {...args} />
            </Route>
          </Switch>
        </MemoryRouter>
      </AuthProvider>
    </MockedProvider>
  </UrqlWrapper>
);
