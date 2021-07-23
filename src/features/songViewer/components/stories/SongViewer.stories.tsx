import { Meta, Story } from '@storybook/react';
import { graphql } from 'msw';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import {
  ClientProvider,
  GetSongResponse,
  GetSongVariables,
  MeResponse,
  MeVariables,
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
    msw: [
      graphql.query('IntrospectionQuery', (req, res, ctx) => res(ctx.data({}))),
      graphql.query<GetSongResponse, GetSongVariables>(
        'GetSong',
        (req, res, ctx) => {
          return res(
            ctx.data({
              song: {
                __typename: 'Song',
                bpm: 100,
                createdAt: '2021-01-01T00:00:00Z',
                id: 100,
                measureCount: 4,
                name: 'Song 1',
                tracks: [
                  {
                    __typename: 'Track',
                    id: 100,
                    isMuted: false,
                    isSoloing: false,
                    position: 1,
                    sequences: [
                      {
                        __typename: 'Sequence',
                        id: 100,
                        measureCount: 1,
                        notes: [],
                        position: 0,
                        track: {
                          __typename: 'Track',
                          id: 100,
                        },
                      },
                      {
                        __typename: 'Sequence',
                        id: 200,
                        measureCount: 2,
                        notes: [],
                        position: 2,
                        track: {
                          __typename: 'Track',
                          id: 100,
                        },
                      },
                    ],
                    song: {
                      __typename: 'Song',
                      id: 100,
                    },
                    voice: {
                      __typename: 'Voice',
                      id: 1,
                      name: 'PWM',
                      toneOscillatorType: 'pwm',
                    },
                    volume: 1,
                  },
                ],
                updatedAt: '2021-01-01T00:00:00Z',
                user: {
                  __typename: 'User',
                  id: 1,
                },
              },
            }),
          );
        },
      ),
      graphql.query<MeResponse, MeVariables>('Me', (req, res, ctx) =>
        res(
          ctx.data({
            me: {
              __typename: 'User',
              email: 'user@ariaapp.io',
              firstName: 'Yorick',
              id: 1,
              lastName: 'User',
            },
          }),
        ),
      ),
    ],
  },
} as Meta;

export const Default: Story<any> = (args) => (
  <RecoilRoot>
    <ClientProvider>
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
    </ClientProvider>
  </RecoilRoot>
);
