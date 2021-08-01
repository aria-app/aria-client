import { Meta, Story } from '@storybook/react';
import { graphql } from 'msw';

import {
  ClientProvider,
  GetVoicesResponse,
  GetVoicesVariables,
} from '../../../api';
import {
  TrackEditingModal,
  TrackEditingModalProps,
} from '../TrackEditingModal';

const voices = [
  {
    id: 1,
    name: 'PWM',
    toneOscillatorType: 'pwm',
  },
  {
    id: 2,
    name: 'Sawtooth',
    toneOscillatorType: 'sawtooth',
  },
  {
    id: 3,
    name: 'Sine',
    toneOscillatorType: 'sine',
  },
];

export default {
  component: TrackEditingModal,
  title: 'TracksEditor/TrackEditingModal',
  parameters: {
    layout: 'fullscreen',
    msw: [
      graphql.query('IntrospectionQuery', (req, res, ctx) => res(ctx.data({}))),
      graphql.query<GetVoicesResponse, GetVoicesVariables>(
        'GetVoices',
        (req, res, ctx) => {
          return res(
            ctx.data({
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
    voice: voices[0],
    volume: -5,
  },
};
