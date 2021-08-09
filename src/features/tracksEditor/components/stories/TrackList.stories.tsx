import { Meta, Story } from '@storybook/react';

import { TrackList, TrackListProps } from '../TrackList';

export default {
  component: TrackList,
  title: 'TracksEditor/TrackList',
  argTypes: {
    onSequenceDeselect: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default: Story<TrackListProps> = (args) => <TrackList {...args} />;

Default.args = {
  selectedSequence: {
    __typename: 'Sequence',
    id: 1,
    measureCount: 1,
    notes: [],
    position: 0,
    track: {
      id: 1,
    },
  },
  songMeasureCount: 4,
  tracks: [
    {
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
        name: 'Voice',
        toneOscillatorType: 'voice',
      },
      volume: 1,
    },
    {
      __typename: 'Track',
      id: 2,
      isMuted: false,
      isSoloing: false,
      position: 2,
      sequences: [
        {
          __typename: 'Sequence',
          id: 3,
          measureCount: 3,
          notes: [],
          position: 0,
          track: {
            __typename: 'Track',
            id: 2,
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
        name: 'Voice',
        toneOscillatorType: 'voice',
      },
      volume: 1,
    },
  ],
};
