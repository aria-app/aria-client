import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Meta, Story } from '@storybook/react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import {
  GET_SONG,
  GetSongResponse,
  GetSongVariables,
  ME,
  MeResponse,
} from '../../../api';
import { AudioProvider } from '../../../audio';
import { AuthProvider } from '../../../auth';
import { Shell } from '../../../shared';
import { SongViewer } from '../SongViewer';

export default {
  component: SongViewer,
  title: 'SongViewer/SongViewer',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const mocks: MockedResponse<Record<string, any>>[] = [
  {
    request: {
      query: GET_SONG,
      variables: { id: 1 } as GetSongVariables,
    },
    result: {
      data: {
        song: {
          bpm: 100,
          createdAt: '2021-01-01',
          id: 1,
          measureCount: 4,
          name: 'Song 1',
          tracks: [
            {
              id: 1,
              isMuted: false,
              isSoloing: false,
              position: 1,
              sequences: [
                {
                  id: 1,
                  measureCount: 1,
                  notes: [],
                  position: 0,
                  track: {
                    id: 1,
                  },
                },
                {
                  id: 2,
                  measureCount: 2,
                  notes: [],
                  position: 2,
                  track: {
                    id: 1,
                  },
                },
              ],
              song: {
                id: 1,
              },
              voice: {
                id: 1,
                name: 'Sawtooth',
                toneOscillatorType: 'sawtooth',
              },
              volume: 1,
            },
          ],
          updatedAt: '2021-01-01',
          user: {
            id: 1,
          },
        },
      } as GetSongResponse,
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
  <RecoilRoot>
    <MockedProvider mocks={mocks}>
      <AuthProvider>
        <AudioProvider>
          <MemoryRouter initialEntries={['/1']}>
            <Shell>
              <Switch>
                <Route path="/:songId">
                  <SongViewer {...args} />
                </Route>
              </Switch>
            </Shell>
          </MemoryRouter>
        </AudioProvider>
      </AuthProvider>
    </MockedProvider>
  </RecoilRoot>
);
