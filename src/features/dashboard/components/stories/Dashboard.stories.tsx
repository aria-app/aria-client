import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Meta, Story } from '@storybook/react';
import { formatISO } from 'date-fns/esm';
import { GraphQLError } from 'graphql';

import {
  CREATE_SONG,
  CreateSongResponse,
  CreateSongVariables,
  DELETE_SONG,
  DeleteSongResponse,
  GET_SONGS,
  GetSongsResponse,
  LOGOUT,
  LogoutResponse,
  ME,
  MeResponse,
} from '../../../api';
import { AuthProvider } from '../../../auth';
import { Dashboard } from '../Dashboard';

export default {
  component: Dashboard,
  argTypes: {
    default: { table: { disable: true } },
    location: { table: { disable: true } },
    navigate: { action: 'navigate', control: false },
    path: { table: { disable: true } },
    uri: { table: { disable: true } },
  },
  title: 'Dashboard/Dashboard',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const mocks: MockedResponse<Record<string, any>>[] = [
  {
    request: {
      query: CREATE_SONG,
      variables: {
        input: {
          name: 'New Song',
        },
      } as CreateSongVariables,
    },
    result: {
      data: {
        createSong: {
          message: 'Song was created.',
          song: {
            id: 2,
            name: 'New Song',
            updatedAt: formatISO(new Date(), { representation: 'date' }),
          },
          success: true,
        },
      } as CreateSongResponse,
    },
  },
  {
    request: {
      query: CREATE_SONG,
      variables: {
        input: {
          name: 'Same',
        },
      } as CreateSongVariables,
    },
    result: {
      errors: [
        new GraphQLError(
          'You already have a song with that name. Please select another.',
        ),
      ],
    },
  },
  {
    request: {
      query: DELETE_SONG,
      variables: {
        id: 1,
      },
    },
    result: {
      data: {
        deleteSong: {
          success: true,
        },
      } as DeleteSongResponse,
    },
  },
  {
    request: {
      query: DELETE_SONG,
      variables: {
        id: 2,
      },
    },
    result: {
      errors: [new GraphQLError('Could not delete song.')],
    },
  },
  {
    request: {
      query: GET_SONGS,
      variables: {
        sort: 'updatedAt',
        sortDirection: 'desc',
        userId: 1,
      },
    },
    result: {
      data: {
        songs: {
          data: [
            {
              id: 1,
              name: 'Song 1',
              updatedAt: '2021-01-01',
            },
            {
              id: 2,
              name: 'Song 2',
              updatedAt: '2021-02-02',
            },
          ],
          meta: {
            currentPage: 1,
            itemsPerPage: 10,
            totalItemCount: 2,
          },
        },
      } as GetSongsResponse,
    },
  },
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
  <MockedProvider mocks={mocks}>
    <AuthProvider>
      <Dashboard {...args} />
    </AuthProvider>
  </MockedProvider>
);
