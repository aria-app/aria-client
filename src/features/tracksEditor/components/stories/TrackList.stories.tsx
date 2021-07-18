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
        name: 'Voice',
        toneOscillatorType: 'voice',
      },
      volume: 1,
    },
    {
      id: 2,
      isMuted: false,
      isSoloing: false,
      position: 2,
      sequences: [
        {
          id: 3,
          measureCount: 3,
          notes: [],
          position: 0,
          track: {
            id: 2,
          },
        },
      ],
      song: {
        id: 1,
      },
      voice: {
        id: 1,
        name: 'Voice',
        toneOscillatorType: 'voice',
      },
      volume: 1,
    },
  ],
};
