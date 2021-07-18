import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Meta, Story } from '@storybook/react';

import { GET_VOICES, GetVoicesResponse } from '../../../api';
import {
  TrackEditingModal,
  TrackEditingModalProps,
} from '../TrackEditingModal';

export default {
  component: TrackEditingModal,
  title: 'TracksEditor/TrackEditingModal',
} as Meta;

const mocks: MockedResponse<Record<string, any>>[] = [
  {
    request: {
      query: GET_VOICES,
    },
    result: {
      data: {
        voices: [
          {
            id: 1,
            name: 'Sawtooth',
            toneOscillatorType: 'sawtooth',
          },
          {
            id: 2,
            name: 'Sine',
            toneOscillatorType: 'sine',
          },
        ],
      } as GetVoicesResponse,
    },
  },
];

export const Default: Story<TrackEditingModalProps> = (args) => (
  <MockedProvider mocks={mocks}>
    <TrackEditingModal {...args} />
  </MockedProvider>
);

Default.args = {
  track: {
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
      id: 2,
      name: 'Sine',
      toneOscillatorType: 'sine',
    },
    volume: -5,
  },
};
