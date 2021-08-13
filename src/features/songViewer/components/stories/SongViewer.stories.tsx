import { Meta, Story } from '@storybook/react';
import { graphql } from 'msw';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import * as fixtures from '../../../../fixtures';
import {
  ClientProvider,
  CurrentUserData,
  CurrentUserVariables,
  GetSongData,
  GetSongVariables,
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
      graphql.query<CurrentUserData, CurrentUserVariables>(
        'CurrentUser',
        (req, res, ctx) =>
          res(
            ctx.data<CurrentUserData>({
              currentUser: fixtures.user,
            }),
          ),
      ),
      graphql.query<GetSongData, GetSongVariables>(
        'GetSong',
        (req, res, ctx) => {
          return res(
            ctx.data<GetSongData>({
              song: fixtures.song,
            }),
          );
        },
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
