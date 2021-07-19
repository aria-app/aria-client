import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Meta, Story } from '@storybook/react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { GET_SONG, GetSongResponse, GetSongVariables } from '../../../api';
import { AudioProvider } from '../../../audio';
import { Shell } from '../../../shared';
import { TracksEditor } from '../TracksEditor';

export default {
  component: TracksEditor,
  title: 'TracksEditor/TracksEditor',
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
];

export const Default: Story<any> = (args) => (
  <RecoilRoot>
    <MockedProvider mocks={mocks}>
      <AudioProvider>
        <MemoryRouter initialEntries={['/1']}>
          <Shell>
            <Switch>
              <Route path="/:songId">
                <TracksEditor {...args} />
              </Route>
            </Switch>
          </Shell>
        </MemoryRouter>
      </AudioProvider>
    </MockedProvider>
  </RecoilRoot>
);
