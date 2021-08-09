import { Meta, Story } from '@storybook/react';
import { graphql } from 'msw';

import {
  ClientProvider,
  GetVoicesData,
  GetVoicesVariables,
} from '../../../api';
import {
  TrackEditingModal,
  TrackEditingModalProps,
} from '../TrackEditingModal';

const voices = [
  {
    __typename: 'Voice',
    id: 1,
    name: 'PWM',
    toneOscillatorType: 'pwm',
  },
  {
    __typename: 'Voice',
    id: 2,
    name: 'Sawtooth',
    toneOscillatorType: 'sawtooth',
  },
  {
    __typename: 'Voice',
    id: 3,
    name: 'Sine',
    toneOscillatorType: 'sine',
  },
];

const track = {
  __typename: 'Track',
  id: 1,
  isMuted: false,
  isSoloing: false,
  position: 1,
  sequences: [
    {
      __typename: 'Sequence',
      id: 1,
      measureCount: 1,
      notes: [],
      position: 0,
      track: {
        __typename: 'Track',
        id: 1,
      },
    },
    {
      __typename: 'Sequence',
      id: 2,
      measureCount: 2,
      notes: [],
      position: 2,
      track: {
        __typename: 'Track',
        id: 1,
      },
    },
  ],
  song: {
    __typename: 'Song',
    id: 1,
  },
  voice: voices[0],
  volume: -5,
};

export default {
  component: TrackEditingModal,
  title: 'TracksEditor/TrackEditingModal',
  parameters: {
    layout: 'fullscreen',
    msw: [
      graphql.query<GetVoicesData, GetVoicesVariables>(
        'GetVoices',
        (req, res, ctx) => {
          return res(
            ctx.data<GetVoicesData>({
              voices,
            }),
          );
        },
      ),
    ],
  },
} as Meta;

export const Default: Story<TrackEditingModalProps> = (args) => (
  <ClientProvider>
    <TrackEditingModal {...args} />
  </ClientProvider>
);

Default.args = {
  track,
};
