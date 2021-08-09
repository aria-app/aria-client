import { Meta, Story } from '@storybook/react';

import {
  TrackListTrackHeader,
  TrackListTrackHeaderProps,
} from '../TrackListTrackHeader';

export default {
  component: TrackListTrackHeader,
  title: 'TracksEditor/TrackListTrackHeader',
  argTypes: {
    onClick: { control: false },
  },
} as Meta;

export const Default: Story<TrackListTrackHeaderProps> = (args) => (
  <TrackListTrackHeader {...args} />
);

Default.args = {
  track: {
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
    voice: {
      __typename: 'Voice',
      id: 1,
      name: 'Sawtooth',
      toneOscillatorType: 'sawtooth',
    },
    volume: 1,
  },
};
