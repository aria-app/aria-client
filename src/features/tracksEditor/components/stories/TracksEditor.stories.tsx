import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
  Router,
} from '@reach/router';
import { Meta, Story } from '@storybook/react';
import { absoluteFill, Box } from 'aria-ui';
import { RecoilRoot } from 'recoil';

import { GET_SONG, GetSongResponse, GetSongVariables } from '../../../api';
import { AudioProvider } from '../../../audio';
import { TracksEditor } from '../TracksEditor';

export default {
  component: TracksEditor,
  title: 'TracksEditor/TracksEditor',
  argTypes: {
    default: { table: { disable: true } },
    location: { table: { disable: true } },
    navigate: { action: 'navigate', control: false },
    path: { table: { disable: true } },
    songId: { table: { disable: true } },
    uri: { table: { disable: true } },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const source = createMemorySource('/1');
const history = createHistory(source);

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
        <LocationProvider history={history}>
          <Box
            as={Router}
            sx={{
              ...absoluteFill,
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <TracksEditor {...args} path="/:songId" />
          </Box>
        </LocationProvider>
      </AudioProvider>
    </MockedProvider>
  </RecoilRoot>
);
